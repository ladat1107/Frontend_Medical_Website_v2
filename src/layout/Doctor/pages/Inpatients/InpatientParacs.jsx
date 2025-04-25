

const InpatientParacs = () => {

    const zoomImage = (image) => {
        window.open(image, "_blank");
    }
    
    return (
        <div className="inpatient-vitals-content">
            <div className="inpatient-vitals-detail">
                <h1 className="inpatient-vitals-detail__header" style={{fontWeight: '600'}}>
                    Ngày: 25/04/2025
                </h1>
                <div className="inpatient-vitals-detail__body flex flex-wrap mt-4 ms-3">
                    <div className="inpatient-vitals-detail__body__item" style={{width: '20%'}}>
                        <p className="gray-p">Bác sĩ thực hiện</p>
                        <p style={{fontWeight: '500'}}>Nguyễn Tiến Thành</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item" style={{width: '80%'}}>
                        <p style={{fontSize: '18px', fontWeight: '500'}}>Cận Lâm Sàng ABCDE</p>    
                        <div className='flex mt-2'>
                            <div className='col-2 gray-p'>Kết quả:</div>
                            <div className='col-8' style={{fontWeight: '500'}}>Bị suy thận rồi :(</div>
                        </div>  
                        <div className='flex mt-2'>
                            <div className='col-2 gray-p'>Mô tả:</div>
                            <div className='col-8' style={{fontWeight: '500'}}>Bla bla bla....</div>
                        </div>  
                        <div className='flex mt-2'>
                            <div className='col-2 gray-p'>Hình ảnh:</div>
                            <div className='col-8' style={{fontWeight: '500'}}>
                                {/* {item.image &&  */}
                                    <span 
                                        onClick={() => zoomImage('https://images.tech.co/wp-content/uploads/2024/01/15074809/AdobeStock_640654498-1-708x400.jpeg')} 
                                        style={{ fontStyle: 'italic', textDecoration: 'underline', color: '#007BFF', cursor: 'pointer' }}>Nhấn để xem
                                    </span>
                                {/* } */}
                            </div>
                        </div>  
                    </div>
                </div>
                <div className="inpatient-vitals-detail__body flex flex-wrap mt-4 ms-3">
                    <div className="inpatient-vitals-detail__body__item" style={{width: '20%'}}>
                        <p className="gray-p">Bác sĩ thực hiện</p>
                        <p style={{fontWeight: '500'}}>Nguyễn Tiến Thành</p>
                    </div>
                    <div className="inpatient-vitals-detail__body__item" style={{width: '80%'}}>
                        <p style={{fontSize: '18px', fontWeight: '500'}}>Cận Lâm Sàng ABCDE</p>    
                        <div className='flex mt-2'>
                            <div className='col-2 gray-p'>Kết quả:</div>
                            <div className='col-8' style={{fontWeight: '500'}}>Bị suy thận rồi :(</div>
                        </div>  
                        <div className='flex mt-2'>
                            <div className='col-2 gray-p'>Mô tả:</div>
                            <div className='col-8' style={{fontWeight: '500'}}>Bla bla bla....</div>
                        </div>  
                        <div className='flex mt-2'>
                            <div className='col-2 gray-p'>Hình ảnh:</div>
                            <div className='col-8' style={{fontWeight: '500'}}>
                                {/* {item.image &&  */}
                                    <span 
                                        onClick={() => zoomImage('https://images.tech.co/wp-content/uploads/2024/01/15074809/AdobeStock_640654498-1-708x400.jpeg')} 
                                        style={{ fontStyle: 'italic', textDecoration: 'underline', color: '#007BFF', cursor: 'pointer' }}>Nhấn để xem
                                    </span>
                                {/* } */}
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InpatientParacs;