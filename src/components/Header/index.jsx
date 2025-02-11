
import SvgIcon from "../SvgIcon";
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import Dropdown from "../Dropdown";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authenSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faHospital, } from "@fortawesome/free-regular-svg-icons";
import { faStethoscope, faSyringe, faUser } from "@fortawesome/free-solid-svg-icons";
import { TAGS } from "@/constant/value";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

function Header() {
  let navigate = useNavigate();
  let { user } = useSelector(state => state.authen);
  let dispatch = useDispatch();
  // language
  const items = [
    { title: "Home", icon: <SvgIcon name="tiktok" /> },
    { title: "About", icon: <SvgIcon name="tiktok" /> },
    { title: "Services", icon: <SvgIcon name="tiktok" /> },
    { title: "Contact", icon: <SvgIcon name="tiktok" /> },
  ];
  // nav

  const navMenu = [
    {
      title: "Dịch vụ",
      inner: [
        { title: "Đặt lịch khám", icon: <FontAwesomeIcon icon={faCalendarCheck} />, action: PATHS.HOME.BOOKING },
        // { title: "medical", icon: null },
        // { title: "medical", icon: null },
      ],
    },
    {
      title: "Bệnh viện",
      inner: [
        { title: "Bác sĩ", icon: <FontAwesomeIcon icon={faSyringe} />, action: PATHS.HOME.DOCTOR_LIST },
        {
          title: "Khoa", icon: <FontAwesomeIcon icon={faHospital} />, action: PATHS.HOME.DEPARTMENT_LIST
        },
        { title: "Chuyên khoa", icon: <FontAwesomeIcon icon={faStethoscope} /> },
      ],
    },
    {
      title: "Cẩm nang y tế",
      inner: [
        { title: TAGS[2].label, icon: null, action: `${PATHS.HOME.HANDBOOK_LIST}/${TAGS[2].value}` },
        { title: TAGS[4].label, icon: null, action: `${PATHS.HOME.HANDBOOK_LIST}/${TAGS[4].value}` },
        { title: TAGS[5].label, icon: null, action: `${PATHS.HOME.HANDBOOK_LIST}/${TAGS[5].value}` },
      ]
    },
    {
      title: "Hướng dẫn",
      inner: [
        { title: "Các tài khoản", icon: null, action: PATHS.HOME.INSTRUCTION },
      ],
    },
    ...(user ? [{
      title: (<div><FontAwesomeIcon icon={faUser} /> Tài khoản</div>),
      inner: [
        { title: "Thông tin cá nhân", icon: null, action: PATHS.HOME.PROFILE },
        { title: "Lịch sử đặt hẹn", icon: null, action: PATHS.HOME.APPOINTMENT_LIST },
      ],
    }] : [])
  ];

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header-img")}>
          <img
            onClick={() => navigate(PATHS.HOME.HOMEPAGE)}
            src="https://res.cloudinary.com/utejobhub/image/upload/v1733740053/KHOA_500_x_200_px_dp7on2.png"
            alt=""
          />
        </div>

        <div className={cx("header-content")}>
          <div className={cx("top-content")}>
            <div className={cx("app-logo")}>
              <div className={cx("item")}>
                <SvgIcon name="tiktok" width={32} height={32} fill="#000" />
                <span className="header-text" >Tiktok</span>
              </div>
              <div className={cx("item")}>
                <SvgIcon name="facebook" width={32} height={32} fill="#000" />
                <span className="header-text" >Facebook</span>
              </div>
              <div className={cx("item")}>
                <SvgIcon name="youtube" width={32} height={32} fill="#000" />
                <span className="header-text" >youtube</span>
              </div>
              <div className={cx("item")}>
                <SvgIcon name="instagram" width={32} height={32} fill="#000" />
                <span className="header-text" >instagram</span>
              </div>
            </div>

            <div className={cx("auth")}>
              {
                user && <div className={cx("language")}>
                  {/* <Dropdown title="Language" items={items} /> */}
                  Chào. {user.firstName}
                </div>
              }
              {user ?
                <div className={cx("account-btn", "header-text")} onClick={() => { dispatch(logout()), navigate(PATHS.HOME.LOGIN) }} >Đăng xuất</div>
                :
                <div className={cx("account-btn", "header-text")} onClick={() => navigate(PATHS.HOME.LOGIN)}>Đăng nhập</div>
              }

            </div>
          </div>

          <div className={cx("bottom-content")}>
            <div className={cx("hotline")}>
              <img
                src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhp.a16c51cc.svg&w=1920&q=75"
                alt="Logo Hoa Sen"
              />
              <div className={cx("hotline-text")}>
                <p className="header-text" >Hỗ trợ đặt khám</p>
                <p style={{ fontSize: "20px", fontWeight: "700", color: "#ffb54a" }} >0353366459</p>
              </div>
            </div>
            <div className={cx("nav")}>
              {navMenu.map((item, index) => {
                return <Dropdown title={item.title} items={item.inner} key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
