import { useEffect, useState } from 'react';
import './Notification.scss';
import { useMutation } from '@/hooks/useMutation';
import { getAllNotification } from '@/services/doctorService';
import { removeExtraSpaces } from '@/utils/formatString';
import { Pagination } from 'antd';
import NotiItem from '@/layout/Doctor/pages/Notification/NotiItem/notiItem';
import { useNotification } from '@/contexts/NotificationContext';

const NotificationUser = () => {
  const { 
    socketNotifications, 
    totalUnreadCount, 
    markAllNotificationsAsRead,
    updateApiUnreadCount
  } = useNotification();
  
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  
  // State for API notifications
  const [apiNotifications, setApiNotifications] = useState({ count: 0, rows: [] });
  const [todayNotifications, setTodayNotifications] = useState([]);
  const [earlierNotifications, setEarlierNotifications] = useState([]);

  // Handle search
  const handleSearchChange = (e) => {
    const value = removeExtraSpaces(e.target.value);
    setSearch(value);
    setSearchValue(value);
  };

  const handleSearch = async () => {
    setSearchLoading(true);
    await fetchAllNoti();
    setSearchLoading(false);
  };

  // Handle pagination
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Fetch notifications from API
  const {
    data: dataNoti,
    loading: listNotiLoading,
    execute: fetchAllNoti,
  } = useMutation((query) => getAllNotification(currentPage, pageSize, search));

  useEffect(() => {
    fetchAllNoti();
  }, [currentPage]);

  // Update state when API data changes
  useEffect(() => {
    if (dataNoti && dataNoti.DT !== undefined) {
      setTotal(dataNoti.DT.totalNotifications);
      setApiNotifications(dataNoti.DT.notifications);
      updateApiUnreadCount(dataNoti.DT.unreadCount);
      setLoading(false);
    }
  }, [dataNoti]);

  // Combine API and socket notifications, categorize by date
  useEffect(() => {
    if (!apiNotifications.rows) return;

    const allNotifications = {
      count: (apiNotifications.rows?.length || 0) + socketNotifications.length,
      rows: [...socketNotifications, ...(apiNotifications.rows || [])]
    };
    
    const today = new Date().toDateString();
    
    const todayNoti = allNotifications.rows.filter(noti => {
      const createdDate = noti.createdAt || noti.date;
      const notiDate = new Date(createdDate).toDateString();
      return notiDate === today;
    });
    
    const earlierNoti = allNotifications.rows.filter(noti => {
      const createdDate = noti.createdAt || noti.date;
      const notiDate = new Date(createdDate).toDateString();
      return notiDate !== today;
    });
    
    setTodayNotifications(todayNoti);
    setEarlierNotifications(earlierNoti);
  }, [apiNotifications, socketNotifications]);

  return (
    <div className="notification-user">
      <p className="title">Danh sách thông báo</p>
      
      <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
        <div className='noti-search'>
          <input type="text" placeholder="Nhập để tìm kiếm..." onChange={handleSearchChange}/>
          {searchLoading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            <i className="fa-solid fa-magnifying-glass" 
              style={{ color: searchValue ? "#003D80" : "" }}
              onClick={handleSearch}
            />
          )}
        </div>
        <button 
          className='button' 
          onClick={markAllNotificationsAsRead}
          disabled={totalUnreadCount === 0} 
        >
          <i className="fa-solid fa-check"></i>
          Đánh dấu tất cả đã đọc
        </button>
      </div>
      
      {loading ? (
        <div className='loading'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <span className='ms-3'>Đang tải thông báo...</span>
        </div>
      ) : (
        <div className="notification-container">
          {(!todayNotifications.length && !earlierNotifications.length) ? (
            <p className="no-notifications">Không có thông báo nào</p>
          ) : (
            <>
              {todayNotifications.length > 0 && (
                <>
                  <p className="date mt-4">Hôm nay</p>
                  <div className='list-noti'>
                    {todayNotifications.map((noti) => (
                      <NotiItem key={noti.id || `today-${Date.now()}-${Math.random()}`} noti={noti} />
                    ))}
                  </div>
                </>
              )}
              
              {earlierNotifications.length > 0 && (
                <>
                  <p className="date mt-4">Trước đó</p>
                  <div className='list-noti'>
                    {earlierNotifications.map((noti) => (
                      <NotiItem key={noti.id || `earlier-${Date.now()}-${Math.random()}`} noti={noti} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
      
      <div className='row mt-3'>
        {total > pageSize && (
          <Pagination
            align="center"
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default NotificationUser;