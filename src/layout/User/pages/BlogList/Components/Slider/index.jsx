import React from "react";
import Slider from "react-slick"; // Import React Slick
import "slick-carousel/slick/slick.css"; // Import Slick Carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import Slick theme CSS
import BigBlog from "@/components/BigBlog";
import "./index.scss";

const SliderComponent = ({
  type = "service",
  numberShow = 6,
  autoplayProps,
  dot = true,
  listData,
}) => {
  const settings = {
    dots: dot, // Hiển thị phân trang
    infinite: true, // Quay vòng slider
    speed: 200, // Tốc độ chuyển slide
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
          return (
            <BigBlog data={item} key={index} />
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderComponent;
