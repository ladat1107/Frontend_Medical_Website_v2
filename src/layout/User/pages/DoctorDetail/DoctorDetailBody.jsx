


import React from 'react'
import classNames from "classnames/bind";
import styles from "./doctorDetail.module.scss";
import { LINK } from '@/constant/value';
import { formatDate } from '@/utils/formatDate';
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const DoctorDetailBody = (props) => {
    let { data, handbook } = props;

    return (
        <div className={cx('doctor-body')} >
            <div className={cx('wrapper')} >
                <div className={cx('introduce')} >
                    <div className={cx('introduce-top')} >
                        <h3 className={cx('title')} >Giới thiệu</h3>
                        <p>{data?.staffUserData?.shortDescription}</p>
                    </div>
                    <div className={cx('introduce-bottom')} >
                        <div dangerouslySetInnerHTML={{ __html: data?.staffUserData?.staffDescriptionData?.htmlContent || "" }}></div>
                    </div>
                </div>

                <div className={cx('related-blog')} >
                    <div className={cx('blog-title')} >Bài viết Liên quan</div>
                    <div className={cx('blog-item-list')} >
                        {handbook?.length > 0 && handbook.map((item, index) => (
                            <div className={cx('blog-item')} key={index} >
                                <div className={cx('blog-item-img')} >
                                    <img src={item?.image || LINK.IMAGE_HANDBOOK} alt="Ảnh cẩm nang y tế" />
                                </div>
                                <div className={cx('blog-item-content')} >
                                    <div className={cx('content-title')} >
                                        <span></span>
                                        <p>{item?.tags?.split(",")[0] || "Tin y tế"}</p>
                                    </div>
                                    <p className={cx('body-content')} >{item?.shortDescription || "Mô tả ngắn"}</p>
                                    <div className={cx('date')} >
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="13" width="13" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 01-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"></path></svg>
                                        <span>{formatDate(item?.updatedAt || new Date())}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DoctorDetailBody