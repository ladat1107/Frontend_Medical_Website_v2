import { io } from "socket.io-client";

const socket = io('http://localhost:8843', {
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});

// Lắng nghe các sự kiện kết nối
socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected from socket server:', reason);
});

// Lắng nghe sự kiện notification
socket.on('notification', (data) => {
  console.log('Received notification:', data);
  // Xử lý thông báo ở đây
});

// Thêm hàm xác thực socket
export const authenticateSocket = (token) => {
  console.log('Authenticating socket with token:', token);
  socket.emit('authenticate', token);
};

// Thêm hàm để lấy socket instance
export const getSocket = () => {
  return socket;
};

// Thêm hàm để ngắt kết nối
export const disconnectSocket = () => {
  socket.disconnect();
};

export default socket;