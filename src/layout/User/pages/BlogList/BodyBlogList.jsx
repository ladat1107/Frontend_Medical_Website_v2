

import React from 'react'
import classNames from "classnames/bind";
import styles from "./blogList.module.scss";
import SliderComponent from './Components/Slider';
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const BodyBlogList = (props) => {
  let { list1, list2, list3 } = props;
  return (
    <div className={cx('body-list-blog')}  >

      <div className={cx('slider-section')} >
        <div className={cx('title-top')} >
          <h3>DINH DƯỠNG HỢP LÝ</h3>
          <span className={cx('line')} ></span>
        </div>

        <SliderComponent listData={list1} numberShow={4} dot={false} autoplayProps={true} />
      </div>
      <div className={cx('slider-section')} >
        <div className={cx('title-top')} >
          <h3>LỜI KHUYÊN BÁC SĨ</h3>
          <span className={cx('line')} ></span>
        </div>

        <SliderComponent listData={list2} numberShow={4} dot={false} autoplayProps={true} />
      </div>
      <div className={cx('slider-section')} >
        <div className={cx('title-top')} >
          <h3>CẬP NHẬT Y HỌC</h3>
          <span className={cx('line')} ></span>
        </div>

        <SliderComponent listData={list3} numberShow={4} dot={false} autoplayProps={true} />
      </div>

    </div>
  )
}

export default BodyBlogList