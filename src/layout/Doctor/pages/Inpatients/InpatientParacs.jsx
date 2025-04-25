

const InpatientParacs = () => {

    const zoomImage = (image) => {
        window.open(image, "_blank");
    }
    
    return (
        <div className="inpatient-vitals-content">
            <div className="flex">
                <div className="inpatient-pres-date" style={{width: '15%'}}>
                    <p style={{fontSize: '18px', fontWeight: '500'}}>25 Tháng 4</p>
                    <p className="gray-p">Thứ sáu</p>
                </div>
                <div className="flex-column" style={{width: '85%'}}>
                    <div className="d-flex  flex-column">
                        <div className="inpatient-pres-detail flex-column m-0" >
                            <div className="flex" style={{width: '100%'}}>
                                <div style={{width: '20%'}}>
                                    <p className="gray-p">Bác sĩ thực hiện</p>
                                    <p style={{fontWeight: '500'}}>Nguyễn Tiến Thành</p>
                                    <div className="flex mt-1 d-flex align-items-center gray-p" style={{width: '100%'}}>
                                        <i className="fa-regular fa-clock me-2 align-middle text-center"></i>
                                        12:00   
                                    </div>
                                </div>
                                <div className="flex-column" style={{width: '80%'}}>
                                    <div className="inpatient-vitals-detail__body__item">
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
                            <div className="flex mt-4" style={{width: '100%'}}>
                                <div style={{width: '20%'}}>
                                    <p className="gray-p">Bác sĩ thực hiện</p>
                                    <p style={{fontWeight: '500'}}>Nguyễn Tiến Thành</p>
                                    <div className="flex mt-1 d-flex align-items-center gray-p" style={{width: '100%'}}>
                                        <i className="fa-regular fa-clock me-2 align-middle text-center"></i>
                                        12:00   
                                    </div>
                                </div>
                                <div className="flex-column" style={{width: '80%'}}>
                                    <div className="inpatient-vitals-detail__body__item">
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
                    </div>
                    <div className="flex mt-2 add-vitals-detail" style={{width: '100%'}}>
                        <i className="fa-solid mr-2 fa-plus"></i> Thêm cận lâm sàng
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InpatientParacs;