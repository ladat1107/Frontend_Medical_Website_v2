import React from "react";
import classNames from "classnames/bind";
import styles from "./doctorList.module.scss";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
import Container from "@/components/Container";
import Banner from "./Banner";
import DoctorInfo from "./DoctorInfo";

const DoctorList = () => {
  return (
    <div>
      <Banner />
      <div className={cx('bg')} >
        <Container>
          <DoctorInfo />
        </Container>
      </div>
    </div>
  );
};

export default DoctorList;
