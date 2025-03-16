import React, { useEffect, useState } from "react";
import { Bell, X, Circle } from "lucide-react";
import socket from "@/Socket/socket";

// Mapping màu sắc theo loại thông báo
const notificationColors = {
  default: "bg-gray-100 text-gray-800",
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  warning: "bg-yellow-100 text-yellow-800",
  info: "bg-blue-100 text-blue-800"
};  

const Notification2 = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleNotification = (data) => {
      const newNotification = {
        id: Date.now(),
        message: data.message,
        timestamp: new Date().toLocaleTimeString(),
        type: data.type || 'default'
      };
      
      // Giới hạn số lượng thông báo hiển thị
      setNotifications((prev) => [
        newNotification, 
        ...prev.slice(0, 4)
      ]);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-96">
      <div className="bg-white shadow-lg rounded-lg border">
        <div className="flex justify-between p-3 border-b items-center">
          <div className="flex items-center">
            <Bell size={20} className="mr-2 text-blue-500" />
            <h3 className="font-bold">Thông Báo</h3>
          </div>
          <button 
            onClick={clearAllNotifications}
            className="text-sm text-gray-500 hover:text-red-500"
          >
            Xóa tất cả
          </button>
        </div>
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Không có thông báo mới
          </div>
        ) : (
          <ul className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <li 
                key={notification.id} 
                className={`
                  p-3 border-b flex justify-between items-start 
                  ${notificationColors[notification.type]} 
                  transition-all duration-300 ease-in-out
                `}
              >
                <div className="flex items-start">
                  <Circle 
                    size={10} 
                    className={`
                      mr-2 mt-1 
                      ${notification.type === 'success' ? 'text-green-500' : 
                        notification.type === 'error' ? 'text-red-500' : 
                        notification.type === 'warning' ? 'text-yellow-500' : 
                        'text-blue-500'
                      }
                    `} 
                  />
                  <div>
                    <p className="text-sm font-medium">{notification.message}</p>
                    <span className="text-xs opacity-70">
                      {notification.timestamp}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notification2;