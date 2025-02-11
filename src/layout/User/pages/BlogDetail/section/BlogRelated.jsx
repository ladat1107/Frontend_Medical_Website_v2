

import React from 'react'
import classNames from "classnames/bind";
import styles from "../../BlogList/blogList.module.scss";
import SliderComponent from '../../BlogList/Components/Slider';
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
// Tạo instance của classnames với bind styles

const BlogRelated = (props) => {
  let { listHandbook } = props;
  return (
    <div className={cx('body-list-blog')}  >

      <div className={cx('slider-section')} >
        <div className={cx('title-top')} >
          <h3>Bài viết liên quan</h3>
          <span className={cx('line')} ></span>
        </div>
        <SliderComponent listData={listHandbook} numberShow={4} dot={false} autoplayProps={true} />
      </div>
    </div>
  )
}

export default BlogRelated;