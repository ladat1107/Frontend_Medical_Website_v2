

const InpatientVitals = () => {
    return (
        <div className="inpatient-vitals-content">
            <div className="flex">
                <div className="inpatient-pres-date" style={{width: '15%'}}>
                    <p style={{fontSize: '18px', fontWeight: '500'}}>25 Tháng 4</p>
                    <p className="gray-p">Thứ sáu</p>
                </div>
                <div className="flex-column" style={{width: '85%'}}>
                    <div className="inpatient-pres-detail flex-column m-0" >
                        <div className="flex ms-3 d-flex align-items-center gray-p" style={{width: '100%'}}>
                            <i className="fa-regular fa-clock me-2 align-middle text-center"></i>
                            12:00   
                        </div>
                        <div className="inpatient-vitals-detail__body flex flex-wrap mt-2 ms-3">
                            <div className="inpatient-vitals-detail__body__item" style={{width: '10%'}}>
                                <p className="gray-p">Chiều cao</p>
                                <p className="mt-1" style={{fontWeight: '500'}}>180 cm</p>
                            </div>
                            <div className="inpatient-vitals-detail__body__item " style={{width: '10%'}}>
                                <p className="gray-p">Cân nặng</p>
                                <p className="mt-1"  style={{fontWeight: '500'}}>60 kg</p>
                            </div>
                            <div className="inpatient-vitals-detail__body__item " style={{width: '10%'}}>
                                <p className="gray-p">Nhiệt độ</p>
                                <p className="mt-1"  style={{fontWeight: '500'}}>37 °C</p>
                            </div>
                            <div className="inpatient-vitals-detail__body__item " style={{width: '12%'}}>
                                <p className="gray-p">Nhịp thở</p>
                                <p className="mt-1"  style={{fontWeight: '500'}}>60 Lần/phút</p>
                            </div>
                            <div className="inpatient-vitals-detail__body__item " style={{width: '16%'}}> 
                                <p className="gray-p">Chỉ số đường huyết</p>
                                <p className="mt-1"  style={{fontWeight: '500'}}>60 mg/dl</p>
                            </div>
                            <div className="inpatient-vitals-detail__body__item " style={{width: '13%'}}>
                                <p className="gray-p">Cân nặng con</p>
                                <p className="mt-1"  style={{fontWeight: '500'}}>300 gram</p>
                            </div>
                            <div className="inpatient-vitals-detail__body__item " style={{width: '13%'}}>
                                <p className="gray-p">Huyết áp</p>
                                <p className="mt-1"  style={{fontWeight: '500'}}>180/60 mmHg</p>
                            </div>
                            <div className="inpatient-vitals-detail__body__item " style={{width: '10%'}}>
                                <p className="gray-p">Mạch</p>
                                <p className="mt-1"  style={{fontWeight: '500'}}>60 Lần/phút</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-2 add-vitals-detail" style={{width: '100%'}}>
                        <i className="fa-solid mr-2 fa-plus"></i> Thêm sinh hiệu
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InpatientVitals;