import { useEffect, useState } from 'react';
import './Notification.scss'
import ViewNoti from './ViewNoti/viewnoti';
import SendNoti from './SendNoti/sendnoti';
import { useMutation } from '@/hooks/useMutation';
import { getAllNotification, getAllUserToNotify } from '@/services/doctorService';
import { Pagination } from 'antd';
import { useSelector } from 'react-redux';
import { ALL_ROLE } from '@/constant/role';
import { set } from 'lodash';

const Notification = () => {
    let { user } = useSelector((state) => state.authen);

    const [selectedRadio, setSelectedRadio] = useState('viewnoti');
    const [userData, setUserData] = useState({});
    const [notiData, setNotiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const [notiDataLoaded, setNotiDataLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [unreadCount, setUnreadCount] = useState(0);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const isDeanById = (id) => {
        const numId = Number(id);
        return userData?.userGroups.some(group => 
            group.users.some(user => 
                Number(user?.id) === numId && user?.isDean === true
            )
        );
    };

    let {
        data: dataUser,
        loading: listUserLoading,
        execute: fetchAllUser,
    } = useMutation((query) => getAllUserToNotify())
    
    useEffect(() => {
        if (dataUser && dataUser.DT !== undefined) {
            setUserData(dataUser.DT);
            console.log(dataUser.DT);
            setUserDataLoaded(true);
        }
    }, [dataUser]);

    let {
        data: dataNoti,
        loading: listNotiLoading,
        execute: fetchAllNoti,
    } = useMutation((query) => getAllNotification(currentPage, pageSize, search))

    useEffect(() => {
        if (dataNoti && dataNoti.DT !== undefined) {
            setTotal(dataNoti.DT.count);
            setNotiData(dataNoti.DT.notifications);
            setUnreadCount(dataNoti.DT.unreadCount);
            setNotiDataLoaded(true);
        }
    }, [dataNoti]);

    // Theo dõi cả hai trạng thái đã tải để cập nhật loading chính
    useEffect(() => {
        if (userDataLoaded && notiDataLoaded) {
            setLoading(false);
        }
    }, [userDataLoaded, notiDataLoaded]);

    useEffect(() => {
        fetchAllUser();
    }, []);

    useEffect(() => {
        fetchAllNoti();
    }, [currentPage, search]);

    const renderContent = () => {
        if (selectedRadio === 'viewnoti') {
            return (
                <div className='view-noti-container'>
                    <div className='noti-search'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Tìm kiếm thông báo" onChange={handleSearchChange}/>
                    </div>
                    <ViewNoti initialNotifications={notiData} />
                    
                    <div className='row mt-3'>
                        {notiData.count > 0 && (
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
            )
        } else {
            if (userData) {
                return <SendNoti dataUser={userData} />;
            } else {
                return (
                    <div className='loading'>
                        <div className='spinner-border text-primary' role='status'>
                            <span className='visually-hidden'>Loading...</span>
                        </div>
                        <span className='ms-3'>Đang tải danh sách người dùng...</span>
                    </div>
                )
            }
        }
    };

    return (
        <div className="send-noti-container">
            <div className='header-send-noti'>
                <div className="d-flex justify-content-between align-items-center">
                    <div className='text'>Thông báo</div>
                    <div>
                        <button className='button'>
                            <i className="fa-solid fa-check"></i>
                            Đánh dấu là đã đọc
                        </button>
                    </div>
                </div>
                {loading ? (
                    <div>
                        Không có biết nữa...
                    </div>
                ):(
                    <>                        
                        {unreadCount === 0 ? (
                            <div>
                                Không có thông báo mới nào!
                            </div>
                        ):(
                            <div>
                                Bạn có {unreadCount} thông báo chưa đọc!
                            </div>  
                        )}
                    </>
                )}
            </div>
            {loading ? (
                <div className='loading'>
                    <div className='spinner-border text-primary' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                </div>
            ) : (
                <div className='send-noti-content'>
                    <div className="radio-noti-inputs row">
                        <div className="col-6 col-lg-2 d-flex justify-content-center">
                            <label className="radio-noti">
                                <input type="radio" name="radio-noti"
                                    value="viewnoti"
                                    defaultChecked={selectedRadio === 'viewnoti'}
                                    onChange={handleRadioChange} />
                                <span className="name">Thông báo</span>
                            </label>
                        </div>
                        {(isDeanById(user.id) || user.role === 1) && 
                            <div className="col-6 col-lg-2 d-flex justify-content-center">
                                <label className="radio-noti">
                                    <input type="radio" name="radio-noti"
                                        value="sendnoti"
                                        onChange={handleRadioChange} />
                                    <span className="name">
                                        Gửi thông báo
                                    </span>
                                </label>
                            </div>
                        }
                    </div>
                    <div className='radio-noti-content'>
                        {renderContent()}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Notification