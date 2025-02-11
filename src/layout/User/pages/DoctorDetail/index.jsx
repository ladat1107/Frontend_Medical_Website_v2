import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./doctorDetail.module.scss";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
import Container from "@/components/Container";
import DoctorDetailHeader from "./DoctorDetailHeader";
import DoctorDetailBody from "./DoctorDetailBody";
import DoctorRelated from "./DoctorRelated";
import { useLocation, useParams } from "react-router-dom";
import userService from "@/services/userService";
import { useMutation } from "@/hooks/useMutation";

const DoctorDetail = () => {
  let { id } = useParams();
  let location = useLocation();
  const {
    data: doctorData,
    error: doctorError,
    execute: getDoctorDetail,
  } = useMutation(() => userService.getDoctorDetail({ id }));
  const doctor = doctorData?.DT || {};
  const {
    data: handbookData,
    error: handbookError,
    execute: getHandbook,
  } = useMutation(() => userService.getHandbook({ departmentId: doctor?.staffUserData?.departmentId }));
  const {
    data: doctorListData,
    error: doctorListError,
    execute: getDoctorList,
  } = useMutation(() => userService.getDoctor({ departmentId: doctor?.staffUserData?.departmentId }));
  useEffect(() => {
    if (doctor?.staffUserData?.departmentId) {
      getHandbook();
      getDoctorList();
    }
  }, [doctor])
  useEffect(() => {
    if (id) {
      getDoctorDetail();
    }
  }, [location]);
  const handbook = handbookData?.DT?.length > 0 ? handbookData.DT : [{}];
  const doctorList = doctorListData?.DT?.length > 0 ? doctorListData.DT : [{}];
  return (
    <div className={cx('bg')} >
      {doctor && handbook.length > 0 && doctorList.length > 0 &&
        <Container>
          <DoctorDetailHeader data={doctor} />
          <DoctorDetailBody data={doctor} handbook={handbook} />
          <div className="mt-5"></div>
          {doctorList.length > 0 && <DoctorRelated doctorList={doctorList} />}
        </Container>
      }
    </div>
  );
};

export default DoctorDetail;
