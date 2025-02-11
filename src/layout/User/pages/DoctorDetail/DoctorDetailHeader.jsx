import React from "react";
import { Breadcrumb } from "antd";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./doctorDetail.module.scss";
import { LINK } from "@/constant/value";
import { formatCurrency } from "@/utils/formatCurrency";
import { PATHS } from "@/constant/path";
import { primaryColorHome, seccondaryColorHome } from "@/style/variables";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
const DoctorDetailHeader = (props) => {
  let { data } = props;
  let navigate = useNavigate()
  return (
    <div className={cx('doctor-header')} >
      <Breadcrumb style={{ marginBottom: "30px", fontSize: "14px", color: "#555", fontWeight: "700" }}>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME.HOMEPAGE} style={{ color: seccondaryColorHome, textDecoration: "none" }}>
            Trang chủ
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME.DOCTOR_LIST} style={{ color: seccondaryColorHome, textDecoration: "none" }}>
            Bác sĩ
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{
            fontWeight: "bold",
            color: primaryColorHome,
          }}> {data.lastName} {data.firstName}</span>

        </Breadcrumb.Item>
      </Breadcrumb>


      <div className={cx("wrapper")}>
        <div className={cx("doctor-header-top")}>
          <div className={cx('doctor-avt')} >
            <img src={data?.avatar || LINK.AVATAR_NULL} alt="bác sĩ" />
          </div>
          <div className={cx('doctor-info')} >
            <h4 className={cx('doctor-info-title')} >
              {data?.staffUserData?.position || "BS"}.  {data.lastName} {data.firstName}
            </h4>
            <div className={cx('doctor-info-content')} >
              <div className={cx('style-info')} >
                <label htmlFor="">Chuyên Khoa</label>
                <span>{data?.staffUserData?.staffSpecialtyData?.name}</span>
              </div>
              <div className={cx('style-info')} >
                <label htmlFor="">Chuyên Trị</label>
                <span>{data?.staffUserData?.staffSpecialtyData?.name}</span>
              </div>
              <div className={cx('style-info')} >
                <label htmlFor="">Giá Khám</label>
                <span>{formatCurrency(data?.staffUserData?.price || 0)}</span>
              </div>
              <div className={cx('style-info')} >
                <label htmlFor="">Lịch Khám</label>
                <span>Hẹn Khám</span>
              </div>

            </div>
          </div>
        </div>
        <div className={cx("doctor-header-bottom")}>
          <div className={cx('address')} >
            <div className={cx('icon')} >
              <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="styles_linear-location__OUB8h" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <div className='text' >
              Bác sĩ chuyên khoa <br />
              Tư vấn online tại website
            </div>
          </div>

          <div className={cx('booking-btn')} onClick={() => { navigate(PATHS.HOME.BOOKING) }} >
            Đặt lịch
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailHeader;
