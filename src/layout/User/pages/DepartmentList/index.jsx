import React from "react";
import classNames from "classnames/bind";
import styles from "./departmentList.module.scss";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
import Container from "@/components/Container";
import Banner from "./Banner";
import DepartmentInfo from "./DepartmentInfo";
import userService from "@/services/userService";
import useQuery from "@/hooks/useQuery";

const DepartmentList = () => {
  const {
    data: departmentData,
    loading: departmentLoading,
  } = useQuery(() => userService.getDepartment());
  const departmentList = departmentData?.DT || [];
  return (
    <div>
      <Banner />
      <div className={cx('bg')} >
        <Container>
          <DepartmentInfo departmentLoading={departmentLoading} departmentList={departmentList} />
        </Container>
      </div>
    </div>
  );
};

export default DepartmentList;
