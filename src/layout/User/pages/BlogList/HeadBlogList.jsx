import React from "react";
import classNames from "classnames/bind";
import styles from "./blogList.module.scss";
import SubBlog from "@/components/Sub-blog";
import { LINK, TAGS } from "@/constant/value";
import { primaryColorHome } from "@/style/variables";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const HeadBlogList = (props) => {
  let listHandbook = props?.list || [];
  let navigate = useNavigate();
  return (
    <div className={cx("head-blog-list")}>
      <ul className={cx("nav-cate")}>
        <li>CẨM NANG Y TẾ</li>
        <li className={cx({ active: props.id === 2 })} onClick={() => navigate(`${PATHS.HOME.HANDBOOK_LIST}/${TAGS[2].value}`)}>{TAGS[2].label}</li>
        <li className={cx({ active: props.id === 4 })} onClick={() => navigate(`${PATHS.HOME.HANDBOOK_LIST}/${TAGS[4].value}`)}>{TAGS[4].label}</li>
        <li className={cx({ active: props.id === 5 })} onClick={() => navigate(`${PATHS.HOME.HANDBOOK_LIST}/${TAGS[5].value}`)}>{TAGS[5].label}</li>
      </ul>

      <div className={cx("blog-list-body")}>
        <div className={cx("body-left")}>
          <div className={cx("blog-banner")}>
            <div className={cx("img")}>
              <img
                src={listHandbook[0]?.image || LINK.IMAGE_HANDBOOK}
                alt="Ảnh bài viết"
              />
            </div>
            <h4 className={cx("blog-banner-title")}>
              {listHandbook[0]?.title || "Bài viết mới nhất"}
            </h4>
            <p>
              {" "}
              {listHandbook[0].shortDescription || ""
              }{" "}
            </p>
            <span>
              {" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 01-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"></path>
              </svg>{" "}
              {formatDate(listHandbook[0]?.updatedAt || new Date())} - {listHandbook[0]?.handbookStaffData?.position || ""} {listHandbook[0]?.handbookStaffData?.staffUserData?.lastName + " " + listHandbook[0]?.handbookStaffData?.staffUserData?.firstName} {" "}
            </span>

            <div className={cx("btn-next")} onClick={() => navigate(PATHS.HOME.HANDBOOK_DETAIL + "/" + listHandbook[0].id)}>Xem tiếp →</div>
          </div>

          <div className={cx("sub-blog")}>
            {listHandbook.slice(1, 3).map((item, index) => (
              <div className={cx("sub-blog-item")} key={index}>
                <img
                  src={item?.image || LINK.IMAGE_HANDBOOK}
                  alt="Ảnh bài viết"
                />
                <div className={cx("content")}>
                  <h4>{item?.title || " Đặt lịch khám, đưa đón tiện lợi Medpro và Toàn Thắng"} </h4>
                  <p>
                    {" "}
                    {item?.shortDescription}{"..."}
                  </p>
                  <div className={cx("btn-next")} onClick={() => navigate(PATHS.HOME.HANDBOOK_DETAIL + "/" + item.id)}>Xem tiếp →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={cx("body-right")}>
          {listHandbook.map((item, index) =>
            <SubBlog key={index} data={item} tag={TAGS[props.id].label} />
          )}

        </div>
      </div>
    </div >
  );
};

export default HeadBlogList;
