import { useEffect, useState } from 'react';
import './Notification.scss'
import ViewNoti from './ViewNoti/viewnoti';
import SendNoti from './SendNoti/sendnoti';
import { useMutation } from '@/hooks/useMutation';
import { getAllUserToNotify } from '@/services/doctorService';

const Notification = () => {
    const [selectedRadio, setSelectedRadio] = useState('viewnoti');
    const [userData, setUserData] = useState({});  // Khởi tạo là mảng rỗng thay vì null
    const [loading, setLoading] = useState(true);

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };

    let {
        data: dataUser,
        loading: listUserLoading,
        execute: fetchAllUser,
    } = useMutation((query) => getAllUserToNotify())
    
    useEffect(() => {
        if (dataUser && dataUser.DT !== undefined) {
            setUserData(dataUser.DT);
            setLoading(false);  // Đặt loading thành false chỉ khi có dữ liệu
        }
    }, [dataUser]);

    useEffect(() => {
        fetchAllUser();
    }, []);


    const renderContent = () => {
        if (selectedRadio === 'viewnoti') {
            return <ViewNoti />;
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
                );
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
                <div>
                    Bạn có 10 thông báo!
                </div>
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