import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import chatService from '../services/chatService';
import labService from '../services/labService';

const MonitorLabs = () => {
  const navigate = useNavigate();
  
  // Dummy active labs data (same as in FacultyDashboard)
  const [activeLabs, setActiveLabs] = useState([
    { 
      id: 1, 
      name: "Computer Networks Lab", 
      students: [
        { id: 1, name: "Abhash Kumar", status: "active", currentTask: "TCP Implementation", progress: 75 },
        { id: 2, name: "Rakesh Kumar", status: "idle", currentTask: "UDP Protocol", progress: 45 },
        { id: 3, name: "Stuti Deoray", status: "active", currentTask: "Network Security", progress: 60 }
      ],
      time: "Monday 10:00 AM" 
    },
    { 
      id: 2, 
      name: "Database Systems Lab", 
      students: [
        { id: 4, name: "Anshika Singh", status: "active", currentTask: "SQL Queries", progress: 85 },
        { id: 5, name: "Brown Munde", status: "active", currentTask: "Database Design", progress: 70 },
        { id: 6, name: "Honey Singh", status: "idle", currentTask: "Normalization", progress: 30 }
      ],
      time: "Tuesday 2:00 PM" 
    },
    { 
      id: 3, 
      name: "Operating Systems Lab", 
      students: [
        { id: 7, name: "Batman", status: "active", currentTask: "Process Scheduling", progress: 55 },
        { id: 8, name: "Chitti the Robot", status: "active", currentTask: "Memory Management", progress: 90 },
        { id: 9, name: "Spider Man", status: "idle", currentTask: "File Systems", progress: 40 }
      ],
      time: "Wednesday 11:00 AM" 
    }
  ]);

  const [selectedLab, setSelectedLab] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [studentCode, setStudentCode] = useState('');

  // Dummy code snippets for demonstration
  const dummyCodeSnippets = {
    1: `def implement_tcp():
    # TCP Implementation
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind(('localhost', 8080))
    sock.listen(5)
    # More implementation...`,
    2: `def udp_protocol():
    # UDP Implementation
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(('localhost', 8081))
    # More implementation...`,
    // ... more code snippets for other students
  };

  // Dummy chat messages
  const dummyMessages = {
    1: [
      { id: 1, sender: 'Abhash Kumar', text: 'Having trouble with TCP connection', time: '10:15 AM' },
      { id: 2, sender: 'Faculty', text: 'Check if the port is already in use', time: '10:16 AM' },
    ],
    2: [
      { id: 1, sender: 'Rakesh Kumar', text: 'UDP implementation completed', time: '10:20 AM' },
      { id: 2, sender: 'Faculty', text: 'Great work! Now add error handling', time: '10:22 AM' },
    ],
  };

  useEffect(() => {
    const fetchActiveLabs = async () => {
      try {
        const labs = await labService.getActiveLabs();
        setActiveLabs(labs);
      } catch (error) {
        console.error('Error fetching active labs:', error);
      }
    };

    fetchActiveLabs();
  }, []);

  const handleLabSelect = (lab) => {
    setSelectedLab(lab);
    setSelectedStudent(null);
    setMessages([]);
    setStudentCode('');
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setStudentCode(dummyCodeSnippets[student.id] || '// No code available');
    setMessages(dummyMessages[student.id] || []);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'Faculty',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
    toast.success('Message sent successfully');
    chatService.sendMessage(newMessage);
  };

  const handleEndSession = (student) => {
    if (window.confirm('Are you sure you want to end this student\'s session?')) {
      toast.info(`Ended session for ${student.name}`);
      // Here you would typically make an API call to end the session
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Monitor Labs</h1>
          <button
            onClick={() => navigate('/facultydashboard')}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Active Labs List */}
          <div className="col-span-1 bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Active Labs</h2>
            <div className="space-y-4">
              {activeLabs.map(lab => (
                <div
                  key={lab.id}
                  onClick={() => handleLabSelect(lab)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedLab?.id === lab.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <h3 className="font-medium">{lab.name}</h3>
                  <p className="text-sm text-gray-300">{lab.time}</p>
                  <p className="text-sm text-gray-300">{lab.students.length} students</p>
                </div>
              ))}
            </div>
          </div>

          {/* Students List */}
          <div className="col-span-1 bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Students</h2>
            {selectedLab ? (
              <div className="space-y-4">
                {selectedLab.students.map(student => (
                  <div
                    key={student.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedStudent?.id === student.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    onClick={() => handleStudentSelect(student)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <p className="text-sm text-gray-300">Task: {student.currentTask}</p>
                        <div className="mt-2 w-full bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-green-500 rounded-full h-2"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          student.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEndSession(student);
                      }}
                      className="mt-2 text-sm text-red-400 hover:text-red-300"
                    >
                      End Session
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Select a lab to view students</p>
            )}
          </div>

          {/* Student Details and Chat */}
          <div className="col-span-1 bg-gray-800 rounded-lg p-4">
            {selectedStudent ? (
              <div className="h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Student Work</h2>
                
                {/* Code View */}
                <div className="bg-gray-900 p-4 rounded mb-4 font-mono text-sm overflow-auto">
                  <pre>{studentCode}</pre>
                </div>

                {/* Chat Section */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-medium mb-2">Chat with {selectedStudent.name}</h3>
                  <div className="flex-1 bg-gray-900 rounded p-4 mb-4 overflow-y-auto">
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`mb-2 ${
                          message.sender === 'Faculty' ? 'text-right' : 'text-left'
                        }`}
                      >
                        <span className="text-xs text-gray-400">{message.sender}</span>
                        <div
                          className={`inline-block rounded-lg px-3 py-2 mt-1 ${
                            message.sender === 'Faculty'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-white'
                          }`}
                        >
                          {message.text}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{message.time}</div>
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-700 rounded px-3 py-2"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Select a student to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorLabs;
