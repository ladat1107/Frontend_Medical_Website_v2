import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import socket from '../Socket/socket';
import { message } from 'antd';
import { markAllRead, updateNotification, getAllNotification } from '../services/doctorService';

// Create the context
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [socketNotifications, setSocketNotifications] = useState([]);
  const [dbNotifications, setDbNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [apiUnreadCount, setApiUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch notifications from database
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getAllNotification();
        if (response && response.data) {
          const notifications = response.data.notifications || [];
          setDbNotifications(notifications);
          const unreadCount = notifications.filter(n => n.status === 1).length;
          setUnreadCount(prev => prev + unreadCount);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông báo từ database:', error);
      }
    };

    fetchNotifications();
  }, []);

  // Socket event handling
  useEffect(() => {
    const handleNewNotification = (data) => {
      // Kiểm tra xem thông báo đã tồn tại chưa
      const notificationExists = socketNotifications.some(
        noti => noti.id === data.id || noti.date === data.date
      );

      if (!notificationExists) {
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
      }
    };

    const handleConnect = () => {
      setIsConnected(true);
      console.log('Socket connected');
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    };

    const handleReconnect = (attemptNumber) => {
      console.log('Socket reconnecting, attempt:', attemptNumber);
    };

    const handleReconnectError = (error) => {
      console.error('Socket reconnection error:', error);
    };

    const handleReconnectFailed = () => {
      console.error('Socket reconnection failed');
    };

    // Đăng ký các event listeners
    socket.on("notification", handleNewNotification);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("reconnect_attempt", handleReconnect);
    socket.on("reconnect_error", handleReconnectError);
    socket.on("reconnect_failed", handleReconnectFailed);

    return () => {
      // Cleanup event listeners
      socket.off("notification", handleNewNotification);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("reconnect_attempt", handleReconnect);
      socket.off("reconnect_error", handleReconnectError);
      socket.off("reconnect_failed", handleReconnectFailed);
    };
  }, [socketNotifications]);

  // Đánh dấu một thông báo cụ thể là đã đọc
  const markNotificationAsRead = async (notificationId) => {
    try {
      // Cập nhật trạng thái trong state
      setSocketNotifications(prev =>
        prev.map(noti =>
          noti.id === notificationId ? { ...noti, status: 2 } : noti
        )
      );

      setDbNotifications(prev =>
        prev.map(noti =>
          noti.id === notificationId ? { ...noti, status: 2 } : noti
        )
      );

      // Giảm số lượng thông báo chưa đọc
      setUnreadCount(prev => Math.max(0, prev - 1));
      setApiUnreadCount(prev => Math.max(0, prev - 1));

      // Gọi API để cập nhật trạng thái trên server
      await updateNotification({
        id: notificationId,
        status: 2
      });

    } catch (error) {
      console.error("Lỗi khi đánh dấu thông báo đã đọc", error);
    }
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = async () => {
    try {
      // Call API to mark all as read
      await markAllRead();

      // Update socket notifications
      setSocketNotifications(prev =>
        prev.map(noti => ({ ...noti, status: 2 }))
      );

      // Update database notifications
      setDbNotifications(prev =>
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

  // Combine notifications from both sources and sort by date
  const allNotifications = [...socketNotifications, ...dbNotifications].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <NotificationContext.Provider
      value={{
        socketNotifications,
        dbNotifications,
        unreadCount,
        apiUnreadCount,
        totalUnreadCount,
        markAllNotificationsAsRead,
        markNotificationAsRead,
        updateApiUnreadCount,
        isConnected,
        notifications: [...(dbNotifications || []), ...(socketNotifications || [])].sort((a, b) => new Date(b.date) - new Date(a.date))
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