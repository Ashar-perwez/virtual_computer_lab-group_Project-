import { Server } from 'socket.io';  // Correctimport express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/lab-content')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage });

// Temporary directory for code files
const TEMP_DIR = path.join(__dirname, 'temp');

// Create temp directory if it doesn't exist
(async () => {
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true });
    console.log('Temp directory created at:', TEMP_DIR);
  } catch (error) {
    console.error('Error creating temp directory:', error);
  }
})();

// Chat room management
const chatRooms = new Map();
const messages = new Map();

// Lab Management
const scheduledLabs = new Map();
const activeLabs = new Map();
const activeStudents = new Map();
const studentCode = new Map();

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join_batch', (batchId) => {
    socket.join(batchId);
  });

  socket.on('new_lab_scheduled', (labData) => {
    io.to(labData.batch).emit('lab_notification', {
      message: `New lab scheduled: ${labData.labName} on ${labData.date}`,
      labData
    });
  });

  socket.on('raise_hand', (data) => {
    io.to(data.labId).emit('student_needs_help', {
      studentId: data.studentId,
      studentName: data.studentName,
      message: data.message
    });
  });

  socket.on('join_chat', ({ studentId }) => {
    const roomId = `student_${studentId}`;
    socket.join(roomId);
    chatRooms.set(socket.id, roomId);
    console.log(`User joined chat room: ${roomId}`);
  });

  socket.on('chat_message', (message) => {
    const roomId = chatRooms.get(socket.id);
    if (roomId) {
      io.to(roomId).emit('chat_message', {
        ...message,
        timestamp: new Date().toISOString()
      });
      // Store message in memory (replace with database in production)
      if (!messages.has(roomId)) {
        messages.set(roomId, []);
      }
      messages.get(roomId).push({
        ...message,
        timestamp: new Date().toISOString()
      });
    }
  });

  socket.on('leave_chat', ({ studentId }) => {
    const roomId = `student_${studentId}`;
    socket.leave(roomId);
    chatRooms.delete(socket.id);
    console.log(`User left chat room: ${roomId}`);
  });

  socket.on('disconnect', () => {
    const roomId = chatRooms.get(socket.id);
    if (roomId) {
      socket.leave(roomId);
      chatRooms.delete(socket.id);
    }
    console.log('User disconnected');
  });

  // Schedule a new lab
  socket.on('schedule_lab', (labData, callback) => {
    try {
      const labId = Date.now().toString();
      const lab = { ...labData, id: labId, activeStudents: [] };
      activeLabs.set(labId, lab);
      socket.broadcast.emit('lab_scheduled', lab);
      callback({ success: true, lab });
    } catch (error) {
      callback({ error: error.message });
    }
  });

  // Start a lab session
  socket.on('start_lab', ({ labId, studentId }, callback) => {
    try {
      const lab = scheduledLabs.get(labId);
      if (!lab) {
        throw new Error('Lab not found');
      }

      // Move lab from scheduled to active
      scheduledLabs.delete(labId);
      activeLabs.set(labId, lab);

      // Add student to active students
      if (!activeStudents.has(labId)) {
        activeStudents.set(labId, new Set());
      }
      activeStudents.get(labId).add(studentId);

      // Initialize empty code for the student
      const studentKey = `${labId}-${studentId}`;
      studentCode.set(studentKey, '');

      // Join lab-specific room
      socket.join(`lab_${labId}`);

      // Notify all clients about the change
      io.emit('lab_started', { labId, studentId });
      
      callback({ success: true });
    } catch (error) {
      callback({ error: error.message });
    }
  });

  // Handle code updates
  socket.on('code_update', ({ labId, studentId, code }) => {
    const studentKey = `${labId}-${studentId}`;
    studentCode.set(studentKey, code);

    // Broadcast to all clients in the lab room
    io.to(`lab_${labId}`).emit('student_update', {
      type: 'code',
      labId,
      studentId,
      code,
      timestamp: new Date().toISOString()
    });
  });

  // Get upcoming labs
  socket.on('get_upcoming_labs', (_, callback) => {
    try {
      const labs = Array.from(scheduledLabs.values());
      callback({ success: true, labs });
    } catch (error) {
      callback({ error: error.message });
    }
  });

  // Get active labs
  socket.on('get_active_labs', (callback) => {
    try {
      const labs = Array.from(activeLabs.values());
      callback({ success: true, labs });
    } catch (error) {
      callback({ error: error.message });
    }
  });

  // Get active students in a lab
  socket.on('get_active_students', ({ labId }, callback) => {
    try {
      const students = Array.from(activeStudents.get(labId) || []);
      const studentsWithCode = students.map(studentId => ({
        studentId,
        code: studentCode.get(`${labId}-${studentId}`) || ''
      }));
      callback({ success: true, students: studentsWithCode });
    } catch (error) {
      callback({ error: error.message });
    }
  });

  // Handle student joining lab
  socket.on('join_lab', ({ labId, studentId, studentName }, callback) => {
    try {
      const lab = activeLabs.get(labId);
      if (!lab) throw new Error('Lab not found');

      const student = { id: studentId, name: studentName, socketId: socket.id };
      if (!lab.activeStudents) lab.activeStudents = [];
      lab.activeStudents.push(student);
      activeStudents.set(studentId, { labId, ...student });

      socket.join(labId);
      io.to(labId).emit('student_joined', student);
      callback({ success: true });
    } catch (error) {
      callback({ error: error.message });
    }
  });

  // Clean up on disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// API Endpoints
app.post('/api/labs/schedule', upload.array('files'), async (req, res) => {
  try {
    const {
      labName,
      batch,
      startTime,
      endTime,
      date,
      description,
      gradingCriteria
    } = req.body;

    const files = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path
    }));

    // TODO: Save lab details to database
    const labData = {
      labName,
      batch,
      startTime,
      endTime,
      date,
      description,
      gradingCriteria,
      files,
      createdAt: new Date()
    };

    // For now, just log the data
    console.log('New lab scheduled:', labData);

    res.status(201).json({ message: 'Lab scheduled successfully', lab: labData });
  } catch (error) {
    console.error('Error scheduling lab:', error);
    res.status(500).json({ message: 'Failed to schedule lab' });
  }
});

app.post('/execute', async (req, res) => {
  console.log('Received execution request:', req.body);
  
  const { code, input, language = 'python' } = req.body;
  
  if (!code) {
    return res.status(400).json({
      success: false,
      error: 'No code provided'
    });
  }

  const timestamp = Date.now();
  const filename = `code_${timestamp}`;
  const fileExtension = language === 'python' ? '.py' : '.js';
  const filePath = path.join(TEMP_DIR, filename + fileExtension);

  console.log('File paths:', {
    filePath,
    tempDir: TEMP_DIR
  });

  try {
    // Ensure temp directory exists
    await fs.mkdir(TEMP_DIR, { recursive: true });
    console.log('Temp directory confirmed');

    // Modify the code to handle input differently
    let modifiedCode;
    if (input) {
      // If input is provided, modify the code to use it
      modifiedCode = `import sys\n_input = """${input}""".split('\\n')\n_input_line = 0\ndef input():\n    global _input_line\n    if _input_line < len(_input):\n        result = _input[_input_line]\n        _input_line += 1\n        return result\n    return ''\n\n${code}`;
    } else {
      modifiedCode = code;
    }

    // Write code to file
    await fs.writeFile(filePath, modifiedCode, 'utf8');
    console.log('Code written to file');

    // Execute the code using spawn
    const python = spawn('python', [filePath]);

    let outputData = '';
    let errorData = '';

    python.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    python.stderr.on('data', (data) => {
      errorData += data.toString();
    });

    python.on('close', async (code) => {
      // Clean up file
      try {
        await fs.unlink(filePath);
        console.log('Files cleaned up');
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }

      if (code !== 0) {
        console.error('Process exited with code:', code);
        return res.status(400).json({
          success: false,
          error: 'Execution failed',
          stderr: errorData
        });
      }

      res.json({
        success: true,
        output: outputData || 'Code executed successfully with no output',
        error: errorData
      });
    });

    // Handle process error
    python.on('error', (error) => {
      console.error('Process error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to start process: ' + error.message
      });
    });

  } catch (error) {
    console.error('Server error:', error);
    // Clean up file in case of error
    try {
      await fs.unlink(filePath).catch(() => {});
    } catch (cleanupError) {
      console.error('Cleanup error during error handling:', cleanupError);
    }

    res.status(500).json({
      success: false,
      error: 'Server error: ' + error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
