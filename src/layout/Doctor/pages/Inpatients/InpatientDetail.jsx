import { useState } from 'react';
import './InpatientList.scss'
import InpatientVitals from './InpatientVitals';
import InpatientParacs from './InpatientParacs';

const InpatientDetail = () => {
    const [selectedRadio, setSelectedRadio] = useState('info');

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };
    
    return (
        <div className="inpatient-exam-content">
            <div className="inpatient-exam-content__header">
                <h1>Bệnh án</h1>
                <p className='mt-2' style={{fontSize: '20px', fontWeight: '500'}}>Nguyễn Văn A</p>
                <div className='gray-text flex mt-2'>
                    <p className='me-3'>#100</p>
                    <p className='me-3'>•</p>
                    <p className='me-2'>Số điện thoại: </p>
                    <p className='me-3'>0823425657</p>
                    <p className='me-3'>•</p>
                    <p className='me-2'>Giới tính: </p>
                    <p className='me-3'>Nam</p>
                    <p className='me-3'>•</p>
                    <p className='me-2'>Ngày sinh: </p>
                    <p className='me-3'>08/06/2003</p>
                    <p className='me-3'>•</p>
                    <p className='me-3'>25 đường số 5, Long Trường, Thủ Đức</p>
                </div>
                <hr className='mt-4'/>
            </div>
            <div className="inpatient-exam-content__body flex mt-4">
                <div className='col-6'>
                    <p className='title mb-2'>Thông tin nhập viện</p>
                    <div className='flex mt-2'>
                        <div className='col-4 gray-p'>Ngày nhập viện:</div>
                        <div className='col-8' style={{fontWeight: '500'}}>25/04/2025</div>
                    </div>
                    <div className='flex mt-2'>
                        <div className='col-4 gray-p'>Khoa:</div>
                        <div className='col-8' style={{fontWeight: '500'}}>Khoa da liễu</div>
                    </div>
                    <div className='flex mt-2'>
                        <div className='col-4 gray-p'>Phòng:</div>
                        <div className='col-8' style={{fontWeight: '500'}}>A5-403</div>
                    </div>
                    <div className='flex mt-2'>
                        <div className='col-4 gray-p'>Bảo hiểm y tế:</div>
                        <div className='col-8' style={{fontWeight: '500'}}>1234567890</div>
                    </div>
                </div>
                <div className='col-6'>
                    <p className='title mb-2'>Thông tin xuất viện</p>
                    <div className='flex mt-2'>
                        <div className='col-4 gray-p'>Ngày xuất viện:</div>
                        <div className='col-8' style={{fontWeight: '500'}}>--/--/20--</div>
                    </div>
                    <div className='flex mt-2'>
                        <div className='col-4 gray-p'>Tình trạng xuất viện:</div>
                        <div className='col-8' style={{fontWeight: '500'}}>Khỏe hơn bình thường</div>
                    </div>
                    <div className='flex mt-2'>
                        <button className='restore-button'>Báo cáo bệnh án</button>
                    </div>
                </div>
            </div>
            <div className="inpatient-exam-content__body mt-4">
                <div className="radio-inputs row m-0" style={{}}>
                    <div className="col-6 col-lg-2 d-flex justify-content-center p-0">
                        <label className="radio">
                            <input type="radio" name="radio-inpatient"
                                value="info"
                                defaultChecked={selectedRadio === 'info'}
                                onChange={handleRadioChange} />
                            <span className="name">
                                Thông tin khám
                            </span>
                        </label>
                    </div>
                    <div className="col-6 col-lg-2 d-flex justify-content-center p-0">
                        <label className="radio">
                            <input type="radio" name="radio-inpatient"
                                value="vitalsign"
                                onChange={handleRadioChange} />
                            <span className="name">Sinh hiệu</span>
                        </label>
                    </div>
                    <div className="col-6 col-lg-2 d-flex justify-content-center p-0">
                        <label className="radio">
                            <input type="radio" name="radio-inpatient"
                                value="paraclinical"
                                onChange={handleRadioChange} />
                            <span className="name">Cận lâm sàng</span>
                        </label>
                    </div>
                    <div className="col-6 col-lg-2 d-flex justify-content-center p-0">
                        <label className="radio">
                            <input type="radio" name="radio-inpatient"
                                value="prescription"
                                onChange={handleRadioChange} />
                            <span className="name">Đơn thuốc</span>
                        </label>
                    </div>
                    <hr/>
                </div>
                {selectedRadio === 'vitalsign' && (
                    <div className="radio-content mt-4">
                            <InpatientVitals/>
                    </div>
                )}
                {selectedRadio === 'paraclinical' && (
                    <div className='radio-content mt-4'>
                            <InpatientParacs/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InpatientDetail;