import React, { useEffect } from "react";

import Marquee from "@/components/Marquee";

import classNames from "classnames/bind";
import styles from "./home.module.scss";
import Container from "@/components/Container";
import Banner from "./Banner";
import Specialty from "./Specialty";
import OurTeam from "./OurTeam";
import Collaboration from "./Collaboration";
import SliderComponent from "./HomeComponent/Slider";
import Department from "./Department";
import Statistical from "./Statistical";
import Dowload from "./Dowload";
import Media from "./Media";
import VideoComponent from "@/components/Video";
import Blog from "./Blog";
import DoctorCard from "@/layout/User/pages/DoctorList/Component";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const HomePage = () => {

  const listAdvertisement = [
    "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F4edacddd-7280-41e0-b6c9-3eb7d438c107-banner_cashback_1180x310_desktop.jpg&w=1200&q=100",
    "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fce76da74-5584-451b-b417-c3b68ce49cfa-viettel_money_banner_fb_1180x310_copy2_copy.png&w=1200&q=100",
    "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fa32bf783-c67b-41d8-87fd-e50f621e5ce2-promote-medpro-de.jpg&w=1200&q=100",
    "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fda64c9ee-fdd6-4a13-bc52-fe74255fc079-promote-vaccine-d.jpg&w=1200&q=100"
  ]
  return (
    <>
      <Marquee />
      <div className={cx("bg-banner")}>
        <Container>
          <Banner />
        </Container>
      </div>

      <Container>
        <Collaboration />
        <SliderComponent
          type="advertisement"
          numberShow={1}
          autoplayProps={true}
          dot={false}
          listData={listAdvertisement}
        />
      </Container>

      <div className={cx("bg-ourTeam")}>
        <Container>
          <Department />
          <OurTeam />
        </Container>
      </div>
      <Container>
        <Specialty />
        <Dowload />
        <Media />
        <VideoComponent />
      </Container>
      <div className={cx("bg-statistical")}>
        <Container>
          <Blog/>
          <Statistical />
        </Container>
      </div>
    </>
  );
};

export default HomePage;
