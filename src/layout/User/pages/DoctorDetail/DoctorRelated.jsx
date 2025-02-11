

import React from 'react'
import classNames from "classnames/bind";
import styles from "../BlogList/blogList.module.scss";
import SliderComponent from '../Home/HomeComponent/Slider';
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
// Tạo instance của classnames với bind styles

const DepartmentRelated = (props) => {
  let { doctorList } = props;
  return (
    <div className={cx('body-list-department')}  >
      <div className={cx('slider-section')} >
        <div className={cx('title-top')} >
          <h3>Bác sĩ cùng chuyên khoa</h3>
          <span className={cx('line')} ></span>
        </div>
        <div className={cx('wrapper')} >
          <SliderComponent type='doctor' numberShow={4} dot={false} listData={doctorList} autoplayProps={true} />
        </div>
      </div>
    </div>
  )
}

export default DepartmentRelated;