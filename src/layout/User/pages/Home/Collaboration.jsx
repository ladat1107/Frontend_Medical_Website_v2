


import React from "react";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import SliderComponent from "./HomeComponent/Slider";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const Collaboration = () => {

  const listColab= [
    {
      title : "bệnh viện nhi đồng", icon :"https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Fstatic%2Fimages%2Fnhidong1%2Fapp%2Fimage%2Flogo_circle.png%3Ft%3D11111&w=64&q=75"

    },
    {
      title : "Đại học y dược", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fc09e66cd-2bbc-4e51-8df4-74417648343a-logo.png&w=64&q=75"
    },
    {
      title : "Bệnh viện da liễu", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Fstatic%2Fimages%2Fdalieuhcm%2Fapp%2Fimage%2Flogo_circle.png%3Ft%3D123&w=64&q=75",

    }
    , {
      title : "Chấn thương chỉnh hình", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Fstatic%2Fimages%2Fctchhcm%2Fweb%2Flogo.png%3F1657159777132%3Ft%3D123&w=64&q=75"
    },
    {
      title : "bệnh viện nhi đồng", icon :"https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Fstatic%2Fimages%2Fnhidong1%2Fapp%2Fimage%2Flogo_circle.png%3Ft%3D11111&w=64&q=75"

    },
    {
      title : "Đại học y dược", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fc09e66cd-2bbc-4e51-8df4-74417648343a-logo.png&w=64&q=75"
    },
    {
      title : "Bệnh viện da liễu", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Fstatic%2Fimages%2Fdalieuhcm%2Fapp%2Fimage%2Flogo_circle.png%3Ft%3D123&w=64&q=75",

    }
    , {
      title : "Chấn thương chỉnh hình", icon : "https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Fstatic%2Fimages%2Fctchhcm%2Fweb%2Flogo.png%3F1657159777132%3Ft%3D123&w=64&q=75"
    }
  ]
  return (
    <div className={cx('colab')} >
        <h3 className={cx("colab-title", "title-section")} >
        Được tin tưởng hợp tác và đồng hành
        </h3>
        <SliderComponent  listData={listColab}  type="colab" dot={false} />
       
    </div>
  )
}

export default Collaboration