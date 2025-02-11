import React from 'react';
import './footer.scss';  

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <img
            src="https://res.cloudinary.com/utejobhub/image/upload/v1733740053/KHOA_500_x_200_px_dp7on2.png"
            alt="Logo"
            className="footer-logo"
          />
        </div>
        <div className="footer-right">
          <div className="footer-section">
            <h4>Dịch vụ Y tế</h4>
            <ul>
              <li>Đặt khám tại cơ sở</li>
              <li>Đặt khám theo bác sĩ</li>
              <li>Tư vấn khám bệnh qua video</li>
              <li>Đặt lịch xét nghiệm</li>
              <li>Gói khám sức khỏe</li>
              <li>Đặt lịch tiêm chủng</li>
              <li>Y tế tại nhà</li>
              <li>Thanh toán Viện phí</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Cơ sở y tế</h4>
            <ul>
              <li>Bệnh viện công</li>
              <li>Bệnh viện tư</li>
              <li>Phòng khám</li>
              <li>Phòng mạch</li>
              <li>Xét nghiệm</li>
              <li>Y tế tại nhà</li>
              <li>Tiêm chủng</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Hướng dẫn</h4>
            <ul>
              <li>Cài đặt ứng dụng</li>
              <li>Đặt lịch khám</li>
              <li>Tư vấn khám bệnh qua video</li>
              <li>Quy trình hoàn phí</li>
              <li>Câu hỏi thường gặp</li>
              <li>Quy trình đi khám</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Liên hệ hợp tác</h4>
            <ul>
              <li>Tham gia Medpro</li>
              <li>Khám sức khỏe doanh nghiệp</li>
              <li>Quảng cáo</li>
              <li>Tuyển Dụng</li>
             
            </ul>
          </div>
          <div className="footer-section">
            <h4>Tin tức </h4>
            <ul>
            
              <li>Tin tức</li>
              <li>Tin dịch vụ</li>
              <li>Tin Y Tế</li>
              <li>Y Học thường thức</li>
             
            </ul>
          </div>
          <div className="footer-section">
            <h4>Về Medpro</h4>
            <ul>
              <li>Về Medpro</li>
              <li>Giới thiệu</li>
              <li>Điều khoản dịch vụ</li>
              <li>Chính sách bảo mật</li>
              <li>Quy định sử dụng</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
