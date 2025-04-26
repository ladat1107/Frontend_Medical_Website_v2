import React from 'react';
import moment from 'moment';
import 'moment/locale/vi';

const InpatientVitals = ({vitalsData}) => {
    const examinationVitalSignData = Array.isArray(vitalsData) ? vitalsData : [];
    const today = moment().format('YYYY-MM-DD');
    moment.locale('vi');

    const weekdaysVi = {
        "Monday": "Thứ Hai",
        "Tuesday": "Thứ Ba", 
        "Wednesday": "Thứ Tư",
        "Thursday": "Thứ Năm",
        "Friday": "Thứ Sáu",
        "Saturday": "Thứ Bảy",
        "Sunday": "Chủ Nhật"
    };    
    
    const groupByDate = () => {
        const grouped = {};
        grouped[today] = [];
        if (!examinationVitalSignData || !examinationVitalSignData.length) return {};

        examinationVitalSignData.forEach(vital => {
            const date = moment(vital.updatedAt).format('YYYY-MM-DD');
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(vital);
        });
        return grouped;
    };

    const groupedData = groupByDate();
    const sortedDates = Object.keys(groupedData).sort((a, b) => moment(b) - moment(a)); 
    
    return (
        <div className="inpatient-vitals-content">
            {sortedDates.length === 0 ? (
                <div className="text-center p-4">Không có dữ liệu sinh hiệu</div>
            ) : (
                sortedDates.map(date => (
                    <div className="flex mb-4" key={date}>
                        <div className="inpatient-pres-date" style={{width: '15%'}}>
                            <p style={{fontSize: '18px', fontWeight: '500'}}>
                                {moment(date).format('D [Tháng] M')}
                            </p>
                            <p className="gray-p">{weekdaysVi[moment(date).format('dddd')] || moment(date).format('dddd')}</p>                        
                        </div>
                        <div className="flex-column" style={{width: '85%'}}>
                            {groupedData[date].length > 0 && (
                                <div className="inpatient-pres-detail flex-column m-0" >
                                    {groupedData[date].map(vital => (
                                        <div key={vital.id}>
                                            <div className="flex ms-3 d-flex align-items-center gray-p" style={{width: '100%'}}>
                                                <i className="fa-regular fa-clock me-2 align-middle text-center"></i>
                                                {moment(vital.updatedAt).format('HH:mm')}
                                            </div>
                                            <div className="inpatient-vitals-detail__body flex flex-wrap mt-2 ms-3 mb-3">
                                                <div className="inpatient-vitals-detail__body__item" style={{width: '10%'}}>
                                                    <p className="gray-p">Chiều cao</p>
                                                    <p className="mt-1" style={{fontWeight: '500'}}>{vital.height} cm</p>
                                                </div>
                                                <div className="inpatient-vitals-detail__body__item" style={{width: '10%'}}>
                                                    <p className="gray-p">Cân nặng</p>
                                                    <p className="mt-1" style={{fontWeight: '500'}}>{vital.weight} kg</p>
                                                </div>
                                                <div className="inpatient-vitals-detail__body__item" style={{width: '10%'}}>
                                                    <p className="gray-p">Nhiệt độ</p>
                                                    <p className="mt-1" style={{fontWeight: '500'}}>{vital.temperature} °C</p>
                                                </div>
                                                <div className="inpatient-vitals-detail__body__item" style={{width: '12%'}}>
                                                    <p className="gray-p">Nhịp thở</p>
                                                    <p className="mt-1" style={{fontWeight: '500'}}>{vital.breathingRate} Lần/phút</p>
                                                </div>
                                                <div className="inpatient-vitals-detail__body__item" style={{width: '16%'}}> 
                                                    <p className="gray-p">Chỉ số đường huyết</p>
                                                    <p className="mt-1" style={{fontWeight: '500'}}>{vital.glycemicIndex} mg/dl</p>
                                                </div>
                                                <div className="inpatient-vitals-detail__body__item" style={{width: '13%'}}>
                                                    <p className="gray-p">Cân nặng con</p>
                                                    <p className="mt-1" style={{fontWeight: '500'}}>{vital.fetalWeight} gram</p>
                                                </div>
                                                <div className="inpatient-vitals-detail__body__item" style={{width: '13%'}}>
                                                    <p className="gray-p">Huyết áp</p>
                                                    <p className="mt-1" style={{fontWeight: '500'}}>{vital.hightBloodPressure}/{vital.lowBloodPressure} mmHg</p>
                                                </div>
                                                <div className="inpatient-vitals-detail__body__item" style={{width: '10%'}}>
                                                    <p className="gray-p">Mạch</p>
                                                    <p className="mt-1" style={{fontWeight: '500'}}>{vital.pulse} Lần/phút</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {date === today && (
                                <div className="flex mt-2 add-vitals-detail" style={{width: '100%'}}>
                                    <i className="fa-solid mr-2 fa-plus"></i> Thêm sinh hiệu
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default InpatientVitals;