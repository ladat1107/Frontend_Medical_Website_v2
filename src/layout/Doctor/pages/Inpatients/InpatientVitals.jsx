

const InpatientVitals = () => {
    return (
        <div className="inpatient-vitals-content">
            <div className="inpatient-vitals-detail">
                <h1 className="inpatient-vitals-detail__header" style={{fontWeight: '600'}}>
                    Ngày: 25/04/2025
                </h1>
                <div className="inpatient-vitals-detail__body flex flex-wrap mt-2 ms-3">
                    <div className="inpatient-vitals-detail__body__item" style={{width: '10%'}}>
                        <p className="gray-p">Chiều cao</p>
                        <p style={{fontWeight: '500'}}>180 cm</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item " style={{width: '10%'}}>
                        <p className="gray-p">Cân nặng</p>
                        <p style={{fontWeight: '500'}}>60 kg</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item " style={{width: '10%'}}>
                        <p className="gray-p">Nhiệt độ</p>
                        <p style={{fontWeight: '500'}}>37 °C</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item " style={{width: '12%'}}>
                        <p className="gray-p">Nhịp thở</p>
                        <p style={{fontWeight: '500'}}>60 Lần/phút</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item " style={{width: '16%'}}> 
                        <p className="gray-p">Chỉ số đường huyết</p>
                        <p style={{fontWeight: '500'}}>60 mg/dl</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item " style={{width: '13%'}}>
                        <p className="gray-p">Cân nặng con</p>
                        <p style={{fontWeight: '500'}}>300 gram</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item " style={{width: '13%'}}>
                        <p className="gray-p">Huyết áp</p>
                        <p style={{fontWeight: '500'}}>180/60 mmHg</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item " style={{width: '10%'}}>
                        <p className="gray-p">Mạch</p>
                        <p style={{fontWeight: '500'}}>60 Lần/phút</p>
                    </div>
                </div>
            </div>
            <div className="inpatient-vitals-detail mt-3">
                <h1 className="inpatient-vitals-detail__header" style={{fontWeight: '600'}}>
                    Ngày: 25/04/2025
                </h1>
                <div className="inpatient-vitals-detail__body flex flex-wrap mt-2 ms-3">
                    <div className="inpatient-vitals-detail__body__item" style={{width: '10%'}}>
                        <p className="gray-p">Chiều cao</p>
                        <p style={{fontWeight: '500'}}>180 cm</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item " style={{width: '10%'}}>
                        <p className="gray-p">Cân nặng</p>
                        <p style={{fontWeight: '500'}}>60 kg</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item " style={{width: '10%'}}>
                        <p className="gray-p">Nhiệt độ</p>
                        <p style={{fontWeight: '500'}}>37 °C</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item " style={{width: '12%'}}>
                        <p className="gray-p">Nhịp thở</p>
                        <p style={{fontWeight: '500'}}>60 Lần/phút</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item " style={{width: '16%'}}> 
                        <p className="gray-p">Chỉ số đường huyết</p>
                        <p style={{fontWeight: '500'}}>60 mg/dl</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item " style={{width: '13%'}}>
                        <p className="gray-p">Cân nặng con</p>
                        <p style={{fontWeight: '500'}}>300 gram</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item " style={{width: '13%'}}>
                        <p className="gray-p">Huyết áp</p>
                        <p style={{fontWeight: '500'}}>180/60 mmHg</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item " style={{width: '10%'}}>
                        <p className="gray-p">Mạch</p>
                        <p style={{fontWeight: '500'}}>60 Lần/phút</p>
                    </div>
                </div>
            </div>
            <div className="add-vitals-detail mt-3">
                <i className="fa-solid mr-2 fa-plus"></i> 
                Thêm sinh hiệu
            </div>
        </div>
    );
}

export default InpatientVitals;