import React from "react";
import classNames from "classnames/bind";
import styles from "./doctorList.module.scss";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
import Container from "@/components/Container";

const Banner = () => {
  return (
    <div className={cx("banner")}>
      <Container>
        <div className={cx("banner-content")}>
          <div className={cx("banner-content-left")}>
            <h3 className={cx("title")}>TƯ VẤN KHÁM BỆNH QUA VIDEO</h3>
            <p>
              Chăm sóc sức khoẻ từ xa kết nối với Bác sĩ qua cuộc gọi Video và
              Nhắn Tin mọi lúc mọi nơi
            </p>
            <span></span>
            <p>
              Liên hệ <i>Chuyên gia</i> để được tư vấn thêm <i>19002138</i>{" "}
            </p>
          </div>
          <div className={cx("banner-content-right")}>
            <img
              src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F5249549a-4d7c-4be8-95a7-ed7569d6bc59-tu-van-kham-benh-qua-video.webp&w=1920&q=75"
              alt=""
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
