import React from "react";
import classNames from "classnames/bind";
import styles from "./subBlog.module.scss";
import { LINK } from "@/constant/value";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
import { formatDate } from "@/utils/formatDate";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const SubBlog = (props) => {
  let data = props?.data || {};
  let navigate = useNavigate();
  return (
    <div onClick={() => navigate(PATHS.HOME.HANDBOOK_DETAIL + "/" + data.id)} key={props.key}>
      <div className={cx("blog-item")}>
        <div className={cx("blog-item-img")}>
          <img
            src={data?.image || LINK.IMAGE_HANDBOOK}
          />
        </div>
        <div className={cx("blog-item-content")}>
          <div className={cx("content-title")}>
            <span></span>
            <p>{props?.tag || "Tin y tế"}</p>
          </div>
          <p className={cx("body-content")}>
            {data?.title || "Bài viết mới nhất"}
          </p>
          <div className={cx("date")} style={{ alignItems: "center" }} >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="13"
              width="13"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 01-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"></path>
            </svg>
            <span>{formatDate(data?.updatedAt || new Date())}</span>
          </div>
          <div className={cx('name')}>{data?.handbookStaffData?.position || ""}. {data?.handbookStaffData?.staffUserData?.lastName + " " + data?.handbookStaffData?.staffUserData?.firstName} {" "}</div>

          <div className={cx('btn-next')}>Xem tiếp → </div>
        </div>
      </div>
    </div>
  );
};

export default SubBlog;
