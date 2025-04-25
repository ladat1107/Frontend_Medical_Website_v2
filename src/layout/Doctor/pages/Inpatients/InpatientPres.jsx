

const InpatientPres = () => {
    
    return (
        <div className="inpatient-vitals-content">
            <div className="flex">
                <div className="inpatient-pres-date" style={{width: '15%'}}>
                    <p style={{fontSize: '18px', fontWeight: '500'}}>25 Tháng 4</p>
                    <p className="gray-p">Thứ sáu</p>
                </div>
                <div className="d-flex flex" style={{width: '85%'}}>
                    <div className="inpatient-pres-detail medicine-sess m-0 me-2" >
                        <p className="text-center" style={{fontWeight: '500'}}>Sáng</p>
                        <div className="medicine-session morning"></div>
                        <div>
                            <p style={{fontWeight: '500'}}>Paracetamol 500mg</p>
                            <p className="gray-p" style={{fontWeight: '500'}}>2 viên</p>
                            <p style={{fontWeight: '500'}}>Paracetamol 500mg</p>
                            <p className="gray-p" style={{fontWeight: '500'}}>2 viên</p>
                        </div>
                    </div>
                    <div className="inpatient-pres-detail medicine-sess m-0  me-2" >
                        <p className="text-center" style={{fontWeight: '500'}}>Trưa</p>
                        <div className="medicine-session lunch"></div>
                        <div>
                            <p style={{fontWeight: '500'}}>Paracetamol 500mg</p>
                            <p className="gray-p" style={{fontWeight: '500'}}>2 viên</p>
                            <p style={{fontWeight: '500'}}>Paracetamol 500mg</p>
                            <p className="gray-p" style={{fontWeight: '500'}}>2 viên</p>
                        </div>
                    </div>
                    <div className="inpatient-pres-detail medicine-sess m-0 me-2" >
                        <p className="text-center" style={{fontWeight: '500'}}>Chiều</p>
                        <div className="medicine-session afternoon"></div>
                        <div>
                            <p style={{fontWeight: '500'}}>Paracetamol 500mg</p>
                            <p className="gray-p" style={{fontWeight: '500'}}>2 viên</p>
                            <p style={{fontWeight: '500'}}>Paracetamol 500mg</p>
                            <p className="gray-p" style={{fontWeight: '500'}}>2 viên</p>
                        </div>
                    </div>
                    <div className="inpatient-pres-detail medicine-sess m-0">
                        <p className="text-center" style={{fontWeight: '500'}}>Tối</p>
                        <div className="medicine-session night"></div>
                        <div>
                            <p style={{fontWeight: '500'}}>Paracetamol 500mg</p>
                            <p className="gray-p" style={{fontWeight: '500'}}>2 viên</p>
                            <p style={{fontWeight: '500'}}>Paracetamol 500mg</p>
                            <p className="gray-p" style={{fontWeight: '500'}}>2 viên</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InpatientPres;   