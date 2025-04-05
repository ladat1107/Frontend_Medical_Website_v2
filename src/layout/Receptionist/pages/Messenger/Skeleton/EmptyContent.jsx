import "../MessengerReceptionist.scss";
const EmptyContent = () => {
    return (
        <div className="chat-content empty-state ">
            <div className="empty-state-content">
                <div className="empty-state-icon">
                    <img className="welcome-icon" src="https://res.cloudinary.com/degcwwwii/image/upload/v1733207843/logo/rr7ytbrcco0hgilykrmo.png" alt="Hoa Sen Hospital" style={{ width: '150px', marginBottom: '10px', borderRadius: '50%' }} />
                </div>
                <h2> Chào mừng đến với Bệnh viện Hoa Sen</h2>
                <p>Chọn một cuộc trò chuyện để bắt đầu nhắn tin với bệnh nhân</p>
                <div className="empty-state-features">
                    <div className="feature-item">
                        <div className="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#00B5F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 22L20 20" stroke="#00B5F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 8C15 8 13.5 9 12 9C10.5 9 9 8 9 8" stroke="#00B5F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="7.5" cy="7.5" r="1" fill="#00B5F1" />
                                <circle cx="16.5" cy="7.5" r="1" fill="#00B5F1" />
                            </svg>
                        </div>
                        <div className="feature-text">
                            <h3>Tư vấn tận tình</h3>
                            <p>Chat trực tiếp với bệnh nhân 24/7</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#00B5F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 6V12L16 14" stroke="#00B5F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="feature-text">
                            <h3>Phản hồi nhanh chóng</h3>
                            <p>Giải đáp thắc mắc kịp thời</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#00B5F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 8V16" stroke="#00B5F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 12H16" stroke="#00B5F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="feature-text">
                            <h3>Chăm sóc chu đáo</h3>
                            <p>Theo dõi sức khỏe bệnh nhân</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmptyContent;
