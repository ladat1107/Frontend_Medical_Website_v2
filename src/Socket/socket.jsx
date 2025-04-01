import { io } from "socket.io-client";

const socket = io('http://localhost:8843', {
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  autoConnect: false
});

// Lắng nghe các sự kiện kết nối
socket.on('connect', () => {
  console.log('Connected to socket server');
  // Gửi token xác thực khi kết nối thành công
  const token = localStorage.getItem('token');
  if (token) {
    socket.emit('authenticate', token);
  }
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected from socket server:', reason);
  if (reason === 'io server disconnect') {
    // Server đã ngắt kết nối, thử kết nối lại
    socket.connect();
  }
});

// Lắng nghe sự kiện notification
socket.on('notification', (data) => {
  //console.log('Received notification:', data);
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