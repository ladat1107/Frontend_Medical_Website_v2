import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from '@/constant/environment';


const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Kết nối socket khi component mount
        const newSocket = io(BASE_URL, {
            withCredentials: true, // Hỗ trợ gửi cookie
            transports: ["websocket"] // Tăng tốc kết nối, tránh lỗi CORS
        });

        setSocket(newSocket);

        return () => {
            // Ngắt kết nối khi component unmount
            newSocket.disconnect();
        };
    }, []);

    return socket;
};

export default useSocket;
