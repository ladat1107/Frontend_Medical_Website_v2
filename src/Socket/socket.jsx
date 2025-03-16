import { io } from "socket.io-client";

const socket = io('http://localhost:8843', {
  withCredentials: true
});

// Thêm hàm xác thực socket
export const authenticateSocket = (token) => {
  socket.emit('authenticate', token);
};

// Lắng nghe các sự kiện kết nối
socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

export default socket;
