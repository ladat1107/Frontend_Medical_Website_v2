import React from "react";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const Media = () => {
  return (
    <div className={cx("media")}>
      <h3 className={cx('media-title',"title-section")}>Truyền thông nói gì về chúng tôi</h3>
      <div className={cx("media-img")}>
        <img
          src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthanh-nien-logo.e8e27f62.png&w=1920&q=75"
          alt=""
        />
        <img
          src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftuoi-tre-logo.96edf351.png&w=1920&q=75"
          alt=""
        />
        <img
          src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbao-nhan-dan.0a666fdb.webp&w=1920&q=75"
          alt=""
        />
        <img
          src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnguoi-lao-dong-logo.2ebb5615.png&w=1920&q=75"
          alt=""
        />
        <img
          src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhtv.e0154343.png&w=1920&q=75"
          alt=""
        />
        <img
          src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbtv-logo.a5df191f.svg&w=1920&q=75"
          alt=""
        />
        <img
          src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvtv1-logo.60a3a5d8.png&w=1920&q=75"
          alt=""
        />
        <img
          src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthvl-logo.c30c70cd.png&w=1920&q=75"
          alt=""
        />
      </div>
    </div>
  );
};

export default Media;
