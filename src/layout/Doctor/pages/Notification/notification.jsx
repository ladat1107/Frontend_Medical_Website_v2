import { useState } from 'react';
import './Notification.scss'
import ViewNoti from './ViewNoti/viewnoti';
import SendNoti from './SendNoti/sendnoti';

const Notification = () => {
    const [selectedRadio, setSelectedRadio] = useState('viewnoti');

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
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
                    {selectedRadio === 'viewnoti' ? (
                        <ViewNoti/>
                    ) : (
                        <SendNoti/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Notification