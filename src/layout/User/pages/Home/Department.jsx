


import React, { useEffect } from 'react'
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import SliderComponent from "./HomeComponent/Slider";
import useQuery from '@/hooks/useQuery';
import userService from '@/services/userService';
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const Department = () => {
  const {
    data: departmentData,
    error: departmentError
  } = useQuery(() => userService.getDepartment())


  const listDepartment = departmentData?.DT || []

  return (
    <div className={cx('department')} >
      <h3 className={cx("department-title", "title-section")} >DANH SÁCH CÁC KHOA CỦA CHÚNG TÔI</h3>
      <SliderComponent type='department' numberShow={4} dot={false} listData={listDepartment} autoplayProps={true} />
    </div>
  )
}

export default Department