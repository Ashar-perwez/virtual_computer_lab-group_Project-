import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class ChatService {
  constructor() {
    this.socket = io(SOCKET_URL);
    this.messageHandlers = new Set();
    this.socket.on('chat_message', (message) => {
      this.messageHandlers.forEach(handler => handler(message));
    });
  }

  // Join a specific chat room (student-faculty)
  joinChat(studentId) {
    this.socket.emit('join_chat', { studentId });
  }

  // Leave the current chat room
  leaveChat(studentId) {
    this.socket.emit('leave_chat', { studentId });
  }

  // Send a message
  sendMessage(message) {
    this.socket.emit('chat_message', message);
  }

  // Register a message handler
  onMessage(handler) {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  // Get connection status
  isConnected() {
    return this.socket.connected;
  }
}

// Create a singleton instance
const chatService = new ChatService();
export default chatService;
