

import React from 'react'
import classNames from "classnames/bind";
import styles from "../../BlogList/blogList.module.scss";
import SliderComponent from '../../Home/HomeComponent/Slider';
import { ROLE } from '@/constant/role';
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
// Tạo instance của classnames với bind styles

const DepartmentRelated = (props) => {
  let { listStaff } = props;
  listStaff = listStaff?.filter((item) => item?.staffUserData.roleId === ROLE.DOCTOR);
  return (
    <div className={cx('body-list-department')}  >

      <div className={cx('slider-section')} >
        <div className={cx('title-top')} >
          <h3>Bác sĩ cùng khoa</h3>
          <span className={cx('line')} ></span>
        </div>
        <div className={cx('wrapper')} >
          <SliderComponent type='doctor' numberShow={listStaff?.length > 4 ? 4 : listStaff?.length} dot={false} listData={listStaff} autoplayProps={true} />
        </div>
      </div>
    </div>
  )
}

export default DepartmentRelated;