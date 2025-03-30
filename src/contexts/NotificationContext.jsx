import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import socket from '../Socket/socket';
import { message } from 'antd';
import { markAllRead } from '../services/doctorService';

// Create the context
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [socketNotifications, setSocketNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [apiUnreadCount, setApiUnreadCount] = useState(0);

  // Socket event handling
  useEffect(() => {
    const handleNewNotification = (data) => {
      const newNotification = {
        id: `socket-${Date.now()}`,
        title: data.title,
        status: 1, // Unread
        htmlDescription: data.htmlDescription,
        date: data.date || new Date().toISOString(),
        NotificationSenderData: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        NotificationAttachFileData: data?.attachedFiles,
      };
      
      setSocketNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    };
    
    socket.on("notification", handleNewNotification);
    
    return () => {
      socket.off("notification", handleNewNotification);
    };
  }, []);

  // Mark all notifications as read
  const markAllNotificationsAsRead = async () => {
    try {
      // Call API to mark all as read
      markAllRead();
      
      // Update socket notifications
      setSocketNotifications(prev => 
        prev.map(noti => ({ ...noti, status: 2 }))
      );
      
      // Reset unread counts
      setUnreadCount(0);
      setApiUnreadCount(0);
      
      // Notify other components
      document.dispatchEvent(new CustomEvent('markAllNotificationsAsRead'));
      
      message.success("Đánh dấu tất cả thông báo đã đọc thành công!");
    } catch (error) {
      console.error("Lỗi khi đánh dấu tất cả thông báo đã đọc", error);
      message.error("Có lỗi xảy ra khi đánh dấu thông báo đã đọc");
    }
  };

  // Update API unread count
  const updateApiUnreadCount = (count) => {
    setApiUnreadCount(count);
  };

  // Get total unread count from both sources
  const totalUnreadCount = unreadCount + apiUnreadCount;

  return (
    <NotificationContext.Provider 
      value={{ 
        socketNotifications, 
        unreadCount, 
        apiUnreadCount,
        totalUnreadCount, 
        markAllNotificationsAsRead, 
        updateApiUnreadCount 
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;