import React, { useState, useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { FiLogOut, FiPlay, FiSend } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { executeCode } from '../services/codeService';
import chatService from '../services/chatService';
import labService from '../services/labService';

const CodingInterface = () => {
  const [code, setCode] = useState('# Write your Python code here\n');
  const [console, setConsole] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState(null);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const consoleInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { studentData, labId, isFaculty, currentCode } = location.state || {};

  useEffect(() => {
    if (currentCode) {
      setCode(currentCode);
    }

    if (studentData) {
      chatService.joinChat(studentData.studentId);
      
      const chatCleanup = chatService.onMessage((message) => {
        setMessages(prev => [...prev, message]);
      });

      const codeCleanup = isFaculty ? 
        labService.onStudentUpdate((update) => {
          if (update.type === 'code' && update.studentId === studentData.studentId) {
            setCode(update.code);
          }
        }) : 
        () => {};

      return () => {
        chatCleanup();
        codeCleanup();
        chatService.leaveChat(studentData.studentId);
      };
    }
  }, [currentCode, studentData, isFaculty]);

  const handleCodeChange = (value) => {
    setCode(value);
    if (!isFaculty && studentData) {
      labService.updateStudentCode(labId, studentData.studentId, value);
    }
  };

  const handleRunCode = async () => {
    try {
      setError(null);
      setIsExecuting(true);
      setConsole('');
      
      const result = await executeCode(code);
      
      if (result.error) {
        setError(result.error);
        setConsole(result.error);
      } else if (result.output !== undefined) {
        setConsole(result.output);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while executing the code');
      setConsole(err.message || 'An error occurred while executing the code');
    } finally {
      setIsExecuting(false);
      setWaitingForInput(false);
    }
  };

  const handleConsoleInput = async (e) => {
    if (e.key === 'Enter' && waitingForInput) {
      const input = e.target.value;
      e.target.value = '';
      setWaitingForInput(false);
      
      try {
        const result = await executeCode(code, input);
        if (result.error) {
          setError(result.error);
          setConsole(prev => `${prev}\n${result.error}`);
        } else if (result.output !== undefined) {
          setConsole(prev => `${prev}\n${result.output}`);
        }
        if (result.waitingForInput) {
          setWaitingForInput(true);
          consoleInputRef.current?.focus();
        }
      } catch (err) {
        setError(err.message || 'An error occurred while processing input');
        setConsole(prev => `${prev}\n${err.message || 'An error occurred while processing input'}`);
      }
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && studentData) {
      chatService.sendMessage({
        senderId: studentData.studentId,
        senderName: studentData.studentName,
        content: newMessage.trim(),
        timestamp: new Date().toISOString()
      });
      setNewMessage('');
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-xl font-bold">Coding Interface</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 p-2 rounded hover:bg-gray-600"
        >
          <FiLogOut />
        </button>
      </div>

      <div className="flex-1 flex">
        {/* Left side - Code Editor */}
        <div className="flex-1 flex flex-col p-4">
          <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden">
            <CodeMirror
              value={code}
              height="100%"
              theme={oneDark}
              extensions={[python()]}
              onChange={handleCodeChange}
            />
          </div>
          
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleRunCode}
              disabled={isExecuting}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                isExecuting ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <FiPlay />
              {isExecuting ? 'Running...' : 'Run Code'}
            </button>
          </div>

          {/* Console Output */}
          <div className="mt-4 bg-black rounded-lg p-4 h-48 overflow-auto font-mono">
            <pre className="text-green-400">{console}</pre>
            {waitingForInput && (
              <input
                ref={consoleInputRef}
                type="text"
                onKeyDown={handleConsoleInput}
                className="w-full bg-transparent border-none outline-none text-green-400"
                placeholder="Enter input..."
                autoFocus
              />
            )}
          </div>
        </div>

        {/* Right side - Chat */}
        {studentData && (
          <div className="w-80 bg-gray-800 p-4 flex flex-col">
            <h2 className="text-lg font-bold mb-4">Chat</h2>
            
            <div className="flex-1 overflow-auto mb-4 space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    msg.senderId === studentData.studentId
                      ? 'bg-blue-600 ml-8'
                      : 'bg-gray-700 mr-8'
                  }`}
                >
                  <div className="text-sm opacity-75">{msg.senderName}</div>
                  <div>{msg.content}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-gray-700 rounded px-3 py-2"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 p-2 rounded hover:bg-blue-700"
              >
                <FiSend />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodingInterface;
