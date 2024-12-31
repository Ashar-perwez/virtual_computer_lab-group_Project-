import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import chatService from '../services/chatService';
import labService from '../services/labService';

const MonitorLabs = () => {
  const navigate = useNavigate();
  const [activeLab, setActiveLab] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [studentCode, setStudentCode] = useState('');

  useEffect(() => {
    // Get active labs
    const fetchActiveLabs = async () => {
      try {
        const labs = await labService.getActiveLabs();
        if (labs.length > 0) {
          setActiveLab(labs[0]); // Select first lab by default
          fetchActiveStudents(labs[0].id);
        }
      } catch (error) {
        console.error('Error fetching active labs:', error);
      }
    };

    // Get active students for a lab
    const fetchActiveStudents = async (labId) => {
      try {
        const activeStudents = await labService.getActiveStudents(labId);
        setStudents(activeStudents);
      } catch (error) {
        console.error('Error fetching active students:', error);
      }
    };

    fetchActiveLabs();

    // Subscribe to student updates
    const cleanup = labService.onStudentUpdate((update) => {
      if (update.type === 'code' && selectedStudent?.studentId === update.studentId) {
        setStudentCode(update.code);
      }
    });

    // Subscribe to chat messages
    const chatCleanup = chatService.onMessage((message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      cleanup();
      chatCleanup();
      if (selectedStudent) {
        chatService.leaveChat(selectedStudent.studentId);
      }
    };
  }, [selectedStudent]);

  const handleStudentSelect = async (student) => {
    if (selectedStudent) {
      chatService.leaveChat(selectedStudent.studentId);
    }
    setSelectedStudent(student);
    setMessages([]); // Clear previous messages
    setStudentCode(student.code); // Show current student's code
    chatService.joinChat(student.studentId);
  };

  const handleOpenInEditor = (student) => {
    navigate('/coding-interface', {
      state: {
        studentData: student,
        labId: activeLab.id,
        isFaculty: true,
        currentCode: studentCode
      }
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedStudent) return;

    const message = {
      content: messageInput,
      sender: 'faculty',
      studentId: selectedStudent.studentId,
      timestamp: new Date().toISOString()
    };

    chatService.sendMessage(message);
    setMessageInput('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Monitor Labs</h2>
        
        {activeLab ? (
          <div className="mb-6">
            <h3 className="text-xl mb-2">Active Lab: {activeLab.name}</h3>
            <p className="text-gray-400">Started at: {new Date(activeLab.scheduledAt).toLocaleString()}</p>
          </div>
        ) : (
          <p className="text-xl text-gray-400">No active labs</p>
        )}

        <div className="grid grid-cols-12 gap-6">
          {/* Students List */}
          <div className="col-span-3 bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl mb-4">Students</h3>
            <div className="space-y-2">
              {students.map((student) => (
                <div
                  key={student.studentId}
                  className={`p-3 rounded cursor-pointer transition-colors ${
                    selectedStudent?.studentId === student.studentId
                      ? 'bg-blue-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => handleStudentSelect(student)}
                >
                  <div className="flex items-center justify-between">
                    <span>{student.name || `Student ${student.studentId}`}</span>
                    <span
                      className={`w-3 h-3 rounded-full ${
                        student.active ? 'bg-green-400' : 'bg-gray-400'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Preview */}
          {selectedStudent ? (
            <div className="col-span-6">
              <div>
                <div className="bg-gray-900 p-4 rounded h-96 overflow-y-auto font-mono">
                  <pre className="text-green-400">
                    {studentCode || '// No code yet'}
                  </pre>
                </div>
                <div className="mt-4 flex space-x-4">
                  <button 
                    onClick={() => handleOpenInEditor(selectedStudent)}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Open in Editor
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-span-6 flex items-center justify-center h-96 bg-gray-800 rounded-lg">
              <p className="text-gray-400">Select a student to view their code</p>
            </div>
          )}

          {/* Chat/Feedback */}
          <div className="col-span-3 bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl mb-4">Chat & Feedback</h3>
            {selectedStudent ? (
              <>
                <div className="h-96 overflow-y-auto mb-4 space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded ${
                        message.sender === 'faculty'
                          ? 'bg-blue-600 ml-4'
                          : 'bg-gray-700 mr-4'
                      }`}
                    >
                      <p>{message.content}</p>
                      <span className="text-xs text-gray-400">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-700 rounded px-3 py-2"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="h-96 flex items-center justify-center text-gray-500">
                Select a student to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorLabs;
