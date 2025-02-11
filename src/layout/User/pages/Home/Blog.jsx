import React from "react";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import userService from "@/services/userService";
import useQuery from "@/hooks/useQuery";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";

// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const Blog = () => {
  let navigate = useNavigate();
  const { data: blogData } = useQuery(() =>
    userService.getHandbook({ limit: 5 })
  );
  const listBlog = blogData?.DT || [];
  return (
    <div className={cx("blog")}>
      <h3 className={cx("blog-title", "title-section")}>Tin tức y tế</h3>
      <div className={cx("blog-item-wrapper")}>
        <div className={cx("blog-item-left")} onClick={() => navigate(PATHS.HOME.HANDBOOK_DETAIL + "/" + listBlog[0].id)}>
          <img
            style={{ borderRadius: "10px" }}
            src={listBlog[0]?.image || "https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732788380111_39096d0123.png&w=1920&q=75"}
            alt="Ảnh bài viết"
          />
          <div className={cx("content")}>
            <h4> {listBlog[0]?.title || "Đặt lịch khám, đưa đón tiện lợi Medpro và Toàn Thắng"} </h4>
            <span> {formatDate(listBlog[0]?.updatedAt || new Date())} - {listBlog[0]?.handbookStaffData?.position || ""} {listBlog[0]?.handbookStaffData?.staffUserData?.lastName + " " + listBlog[0]?.handbookStaffData?.staffUserData?.firstName} </span>
            <p>
              {" "}
              {listBlog[0]?.shortDescription}{" "}
            </p>
          </div>
        </div>
        <div className={cx("blog-item-right")}>
          {listBlog.slice(1, 5).map((item, index) => (
            <div className={cx("blog-inner-item")} key={index} onClick={() => navigate(PATHS.HOME.HANDBOOK_DETAIL + "/" + item.id)}>
              <img
                style={{ width: "100%", height: "200px", borderRadius: "10px" }}
                src={item?.image || "https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732788380111_39096d0123.png&w=1920&q=75"}
                alt="Ảnh bài viết"
              />
              <div className={cx("content")}>
                <h4> {item?.title || "Đặt lịch khám, đưa đón tiện lợi Medpro và Toàn Thắng"} </h4>
                <span> {formatDate(item?.updatedAt || new Date())} - {item?.handbookStaffData?.position || ""} {item?.handbookStaffData?.staffUserData?.lastName + " " + item?.handbookStaffData?.staffUserData?.firstName} </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={cx('btn-show-more')} onClick={() => navigate(PATHS.HOME.HANDBOOK_LIST + '/3')} >Xem tất cả</div>
    </div>
  );
};

export default Blog;
