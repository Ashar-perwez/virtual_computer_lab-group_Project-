import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class LabService {
  constructor() {
    this.socket = io(SOCKET_URL);
    this.labHandlers = new Set();
    this.studentUpdateHandlers = new Set();
    
    // Listen for lab updates
    this.socket.on('lab_scheduled', (lab) => {
      this.labHandlers.forEach(handler => handler(lab));
    });

    // Listen for student updates in lab
    this.socket.on('student_update', (update) => {
      this.studentUpdateHandlers.forEach(handler => handler(update));
    });
  }

  // Schedule a new lab
  scheduleLab(labData) {
    return new Promise((resolve, reject) => {
      this.socket.emit('schedule_lab', labData, (response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.lab);
        }
      });
    });
  }

  // Get all active labs
  getActiveLabs() {
    return new Promise((resolve, reject) => {
      this.socket.emit('get_active_labs', (response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.labs);
        }
      });
    });
  }

  // Get active students for a lab
  getActiveStudents(labId) {
    return new Promise((resolve, reject) => {
      this.socket.emit('get_active_students', { labId }, (response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.students);
        }
      });
    });
  }

  // Start a lab session for a student
  startLab(labId, studentId, studentName) {
    return new Promise((resolve, reject) => {
      this.socket.emit('join_lab', { labId, studentId, studentName }, (response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Update student's code in real-time
  updateStudentCode(labId, studentId, code) {
    this.socket.emit('code_update', {
      labId,
      studentId,
      code
    });
  }

  // Subscribe to lab updates
  onLabUpdate(handler) {
    this.labHandlers.add(handler);
    return () => this.labHandlers.delete(handler);
  }

  // Subscribe to student updates
  onStudentUpdate(handler) {
    this.studentUpdateHandlers.add(handler);
    return () => this.studentUpdateHandlers.delete(handler);
  }
}

// Create a singleton instance
const labService = new LabService();
export default labService;
