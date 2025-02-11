import React from "react";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import Search from "./HomeComponent/Search";
import SliderComponent from "./HomeComponent/Slider";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
const Banner = () => {


  const listService = [
    {title : "Đặt khám theo bác sĩ ", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F488715df-05ff-42ef-bf6b-27d91d132158-bacsi.png&w=64&q=75"},
    {title : "Tư vấn khám qua video" , icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F9fdd77eb-9baa-4f3b-a108-d91e136a0bf9-tele.png&w=64&q=75"},
    {title : "Đặt lịch xét nghiệm", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fc193937f-8c0f-479e-be31-5610db6f7df1-dat-lich-xet-nghiem.png&w=64&q=75"},
    {title : "Gói khám sức khỏe", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2Fb4181f19-f965-40b8-a4c5-2996cb960104-goi_kham.png&w=64&q=75"},
    {title : "Đặt khám theo bác sĩ ", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F488715df-05ff-42ef-bf6b-27d91d132158-bacsi.png&w=64&q=75"},
    {title : "Tư vấn khám qua video" , icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F9fdd77eb-9baa-4f3b-a108-d91e136a0bf9-tele.png&w=64&q=75"},
    {title : "Đặt lịch xét nghiệm", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fc193937f-8c0f-479e-be31-5610db6f7df1-dat-lich-xet-nghiem.png&w=64&q=75"},
    {title : "Gói khám sức khỏe", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2Fb4181f19-f965-40b8-a4c5-2996cb960104-goi_kham.png&w=64&q=75"},
    {title : "Đặt khám theo bác sĩ ", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F488715df-05ff-42ef-bf6b-27d91d132158-bacsi.png&w=64&q=75"},
    {title : "Tư vấn khám qua video" , icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F9fdd77eb-9baa-4f3b-a108-d91e136a0bf9-tele.png&w=64&q=75"},
    {title : "Đặt lịch xét nghiệm", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fc193937f-8c0f-479e-be31-5610db6f7df1-dat-lich-xet-nghiem.png&w=64&q=75"},
    {title : "Gói khám sức khỏe", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2Fb4181f19-f965-40b8-a4c5-2996cb960104-goi_kham.png&w=64&q=75"},
    {title : "Đặt khám theo bác sĩ ", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F488715df-05ff-42ef-bf6b-27d91d132158-bacsi.png&w=64&q=75"},
    {title : "Tư vấn khám qua video" , icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F9fdd77eb-9baa-4f3b-a108-d91e136a0bf9-tele.png&w=64&q=75"},
    {title : "Đặt lịch xét nghiệm", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fc193937f-8c0f-479e-be31-5610db6f7df1-dat-lich-xet-nghiem.png&w=64&q=75"},
    {title : "Gói khám sức khỏe", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2Fb4181f19-f965-40b8-a4c5-2996cb960104-goi_kham.png&w=64&q=75"}
  ]
 
  return (
    <div className={cx("banner")}>
      <div className={cx("top-search")}>
        <h2 className={cx("title-search")}>
          Kết Nối Người Dân Với Cơ Sở Y Tế - Dịch Vụ Y Tế
        </h2>

        <Search />
        <h4 className={cx("sub-title","subtitle-section")}>
          Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa
        </h4>
      </div>
      <SliderComponent listData={listService} dot={false} />
    </div>
  );
};

export default Banner;
