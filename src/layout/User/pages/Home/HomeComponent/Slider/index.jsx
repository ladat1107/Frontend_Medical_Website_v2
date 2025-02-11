import React from "react";
import Slider from "react-slick"; // Import React Slick
import "slick-carousel/slick/slick.css"; // Import Slick Carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import Slick theme CSS
import "./slider.scss";
import DepartmentCard from "@/components/DepartmentCard";
import DoctorCard from "@/components/DoctorCard";

const SliderComponent = ({ type = "service", numberShow = 6, autoplayProps, dot = true, listData }) => {
  const settings = {
    dots: dot, // Hiển thị phân trang
    // infinite: true, // Quay vòng slider
    speed: 2000, // Tốc độ chuyển slide
    slidesToShow: numberShow, // Số lượng slide hiển thị cùng lúc
    slidesToScroll: 1, // Số slide chuyển mỗi lần
    autoplay: autoplayProps ? true : false, // Tự động chuyển slide
    autoplaySpeed: 2000, // Thời gian giữa các lần chuyển slide
    centerMode: false, // Nếu muốn các item ở giữa được căn giữa
    focusOnSelect: false, // Ngừng chuyển slide khi hover vào item
    draggable: false, // Ngừng kéo slider khi hover vào item
    swipe: false, // Ngừng khả năng vuốt
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {listData?.map((item, index) => {
          if (type === "service") {
            return (
              <div className="item-service" key={index}>
                <img src={item.icon} alt="" />
                <p className="main-text">{item.title}</p>
              </div>
            );
          } else if (type === 'doctor') {
            return (
              <DoctorCard key={index} doctor={item} />
            )
          } else if (type === 'colab') {
            return (
              <div className="item-colab" key={index}>
                <img src={item.icon} alt="" />
                <p className="main-text" >{item.title}</p>
              </div>
            )
          } else if (type === 'advertisement') {
            return (
              <div className="item-advertisement" key={index} >
                <img src={item || "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fce76da74-5584-451b-b417-c3b68ce49cfa-viettel_money_banner_fb_1180x310_copy2_copy.png&w=1200&q=100"} alt="" />
              </div>
            )
          } else if (type = 'department') {

            return (
              <DepartmentCard {...item} key={index} />
            )
          }
        })}
      </Slider>
    </div>
  );
};

export default SliderComponent;
