import React from 'react';
import moment from 'moment';
import 'moment/locale/vi';

const InpatientParacs = ({paracsData}) => {
    const examinationResultParaclincalData = Array.isArray(paracsData) ? paracsData : [];
    const today = moment().format('YYYY-MM-DD');
    moment.locale('vi');
    
    // Dùng map thay vì object để hiển thị thứ trong tuần bằng tiếng Việt
    const getDayOfWeekVi = (date) => {
        const day = moment(date).day();
        const daysInVietnamese = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
        return daysInVietnamese[day];
    };

    const groupByDate = () => {
        const grouped = {};
        grouped[today] = [];
        if (!examinationResultParaclincalData || !examinationResultParaclincalData.length) return {};

        examinationResultParaclincalData.forEach(parac => {
            const date = moment(parac.updatedAt).format('YYYY-MM-DD');
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(parac);
        });
        return grouped;
    };

    const groupedData = groupByDate();
    const sortedDates = Object.keys(groupedData).sort((a, b) => moment(b) - moment(a)); 

    const zoomImage = (image) => {
        window.open(image, "_blank");
    }
    
    return (
        <div className="inpatient-vitals-content">
            {sortedDates.length === 0 ? (
                <div className="text-center p-4">Không có dữ liệu cận lâm sàng</div>
            ) : (
                sortedDates.map(date => (
                    <div className="flex mb-4" key={date}>
                        <div className="inpatient-pres-date" style={{width: '15%'}}>
                            <p style={{fontSize: '18px', fontWeight: '500'}}>
                                {moment(date).format('D [Tháng] M')}
                            </p>
                            <p className="gray-p">{getDayOfWeekVi(date)}</p>
                        </div>
                        <div className="flex-column" style={{width: '85%'}}>
                            {groupedData[date].length > 0 && (
                                <div className="d-flex flex-column">
                                    <div className="inpatient-pres-detail flex-column m-0">
                                        {groupedData[date].map(parac => (
                                            <div key={parac.id} className="flex mb-3" style={{width: '100%'}}>
                                                <div style={{width: '20%'}}>
                                                    <p className="gray-p">Bác sĩ thực hiện</p>
                                                    <p style={{fontWeight: '500'}}>
                                                        {parac.doctorParaclinicalData?.staffUserData ? 
                                                            `${parac.doctorParaclinicalData.staffUserData.lastName} ${parac.doctorParaclinicalData.staffUserData.firstName}` : 
                                                            'Không có thông tin'}
                                                    </p>
                                                    <div className="flex mt-1 d-flex align-items-center gray-p" style={{width: '100%'}}>
                                                        <i className="fa-regular fa-clock me-2 align-middle text-center"></i>
                                                        {moment(parac.updatedAt).format('HH:mm')}
                                                    </div>
                                                </div>
                                                <div className="flex-column" style={{width: '80%'}}>
                                                    <div className="inpatient-vitals-detail__body__item">
                                                        <p style={{fontSize: '18px', fontWeight: '500'}}>{parac.paracName}</p>    
                                                        <div className='flex mt-2'>
                                                            <div className='col-2 gray-p'>Kết quả:</div>
                                                            <div className='col-8' style={{fontWeight: '500'}}>{parac.result || 'Chưa có kết quả'}</div>
                                                        </div>  
                                                        <div className='flex mt-2'>
                                                            <div className='col-2 gray-p'>Mô tả:</div>
                                                            <div className='col-8' style={{fontWeight: '500'}}>{parac.description || ''}</div>
                                                        </div>  
                                                        <div className='flex mt-2'>
                                                            <div className='col-2 gray-p'>Hình ảnh:</div>
                                                            <div className='col-8' style={{fontWeight: '500'}}>
                                                                {parac.image && 
                                                                    <span 
                                                                        onClick={() => zoomImage(parac.image)} 
                                                                        style={{ fontStyle: 'italic', textDecoration: 'underline', color: '#007BFF', cursor: 'pointer' }}>
                                                                        Nhấn để xem
                                                                    </span>
                                                                }
                                                                {!parac.image && ''}
                                                            </div>
                                                        </div>
                                                        <div className='flex mt-2'>
                                                            <div className='col-2 gray-p'>Phòng thực hiện:</div>
                                                            <div className='col-8' style={{fontWeight: '500'}}>{parac.roomParaclinicalData?.name || ''}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {date === today && (
                                <div className="flex mt-2 add-vitals-detail" style={{width: '100%'}}>
                                    <i className="fa-solid mr-2 fa-plus"></i> Thêm cận lâm sàng
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default InpatientParacs;