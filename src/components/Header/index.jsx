import SvgIcon from "../SvgIcon";
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import Dropdown from "../Dropdown";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faHospital, } from "@fortawesome/free-regular-svg-icons";
import { faStethoscope, faSyringe, faUser } from "@fortawesome/free-solid-svg-icons";
import { TAGS } from "@/constant/value";
import { Badge, Dropdown as AntDropdown, Spin } from "antd";
import { useNotification } from "@/contexts/NotificationContext";
import { useState, useEffect } from "react";
import { timeAgo } from "@/utils/formatDate";
import ParseHtml from "@/components/ParseHtml";
import { useMutation } from "@/hooks/useMutation";
import { getAllNotification } from "@/services/doctorService";

import { handleLogout } from "@/redux/actions/authenActions";
import { ROLE } from "@/constant/role";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

function Header() {
  let navigate = useNavigate();
  let { user } = useSelector(state => state.authen);
  let dispatch = useDispatch();
  const { totalUnreadCount, socketNotifications } = useNotification();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [open, setOpen] = useState(false);

  // States for combined notifications
  const [apiNotifications, setApiNotifications] = useState({ rows: [] });
  const [combinedNotifications, setCombinedNotifications] = useState([]);

  // Fetch notifications from API (similar to NotificationUser)
  const {
    data: dataNoti,
    loading: listNotiLoading,
    execute: fetchAllNoti,
  } = useMutation(() => getAllNotification(1, 5, '')); // Fetch only 5 newest notifications

  // Fetch notifications when dropdown is opened
  useEffect(() => {
    if (isDropdownVisible && user) {
      fetchAllNoti();
    }
  }, [isDropdownVisible]);

  // Update API notifications when data changes
  useEffect(() => {
    if (dataNoti && dataNoti.DT !== undefined) {
      setApiNotifications(dataNoti.DT.notifications);
    }
  }, [dataNoti]);

  // Combine socket and API notifications
  useEffect(() => {
    if (!apiNotifications.rows) return;

    // Lấy tất cả thông báo từ cả hai nguồn
    const allNotifications = [
      ...socketNotifications,
      ...(apiNotifications.rows || [])
    ];

    const uniqueNotiMap = new Map();

    allNotifications.forEach(noti => {
      if (noti.notiCode) {
        // Nếu thông báo có cùng notiCode, giữ lại thông báo mới nhất
        const existingNoti = uniqueNotiMap.get(noti.notiCode);
        if (!existingNoti || new Date(noti.createdAt || noti.date) > new Date(existingNoti.createdAt || existingNoti.date)) {
          uniqueNotiMap.set(noti.notiCode, noti);
        }
      } else {
        const uniqueKey = noti.id || `temp-${Date.now()}-${Math.random()}`;
        uniqueNotiMap.set(uniqueKey, noti);
      }
    });

    const uniqueNotifications = Array.from(uniqueNotiMap.values())
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date);
        const dateB = new Date(b.createdAt || b.date);
        return dateB - dateA;
      })
      .slice(0, 5);

    setCombinedNotifications(uniqueNotifications);
  }, [apiNotifications, socketNotifications]);

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
        { title: "Thông báo cá nhân", icon: null, action: PATHS.HOME.NOTIFICATION },
        ...(user.role === ROLE.ADMIN || user.staff ? [{
          title: "Trang quản lý", icon: null, action: user.role === ROLE.ADMIN ? PATHS.ADMIN.DASHBOARD : PATHS.STAFF.DASHBOARD
        }] : [])
      ],
    }] : [])
  ];

  // Updated notification dropdown items using combined notifications
  const notificationItems = {
    items: [
      ...(combinedNotifications.map((noti, index) => ({
        key: noti.id || `noti-${index}`,
        label: (
          <div className={cx("notification-item")} onClick={() => navigate(PATHS.HOME.NOTIFICATION)}>
            <div className={cx("notification-title")}>
              {noti.title || 'Thông báo mới'}
              {(noti.status === 1 || noti.isRead === false) && <span className={cx("unread-badge")}></span>}
            </div>
            <div className={cx("notification-content")}>
              {noti.htmlDescription ? (
                <ParseHtml htmlString={noti.htmlDescription} />
              ) : (
                <span>{noti.description || 'Không có nội dung'}</span>
              )}
            </div>
            <div className={cx("notification-time")}>
              {(noti.date || noti.createdAt) ? timeAgo(noti.date || noti.createdAt) : 'Vừa nãy'}
            </div>
          </div>
        )
      })) || []),
      {
        key: 'view-all',
        label: (
          <div className={cx("view-all")} onClick={() => navigate(PATHS.HOME.NOTIFICATION)}>
            Xem tất cả thông báo
          </div>
        )
      }
    ]
  };

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
              {user && (
                <AntDropdown
                  menu={notificationItems}
                  trigger={['click']}
                  open={isDropdownVisible}
                  onOpenChange={setIsDropdownVisible}
                  overlayStyle={{ width: 350 }}
                  dropdownRender={(menu) => (
                    <div>
                      {listNotiLoading ? (
                        <div className={cx("loading-container")} style={{ padding: "20px", textAlign: "center" }}>
                          <Spin tip="Đang tải thông báo..." />
                        </div>
                      ) : (
                        menu
                      )}
                    </div>
                  )}
                >
                  <div className={cx("item")} style={{ cursor: "pointer" }}>
                    <Badge dot={totalUnreadCount > 0} offset={[-15, 5]}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="30" width="26" viewBox="0 0 448 512">
                        <path fill="#ffc107" d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                      </svg>
                    </Badge>
                  </div>
                </AntDropdown>
              )}
              {
                user && <div className={cx("language")}>
                  {/* <Dropdown title="Language" items={items} /> */}
                  Chào. {user.firstName}
                </div>
              }
              {user ?
                <div className={cx("account-btn", "header-text")} onClick={() => { dispatch(handleLogout()); }} >Đăng xuất</div>
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