

import React from 'react'
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import SliderComponent from './HomeComponent/Slider';
import useQuery from '@/hooks/useQuery';
import userService from '@/services/userService';
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const OurTeam = () => {

  const {
    data: doctorData,
    error: doctorError
  } = useQuery(() => userService.getDoctor())


  const listDoctor = doctorData?.DT || [];


  return (
    <div className={cx('ourTeam')} >
      <h3 className={cx('ourTeam-title', "title-section")} >
        ĐỘI NGŨ BÁC SĨ
      </h3>
      <div className={cx('wrapper')} >
        <SliderComponent type='doctor' numberShow={4} dot={false} listData={listDoctor} autoplayProps={true} />
      </div>

    </div>
  )
}

export default OurTeam