import React, { useState } from 'react';
import { HomeOutlined, UserSwitchOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBuilding, faCalendarDays, faHospital } from '@fortawesome/free-regular-svg-icons';
import { PATHS } from '@/constant/path';
import emitter from '@/utils/eventEmitter';
import { EMIT } from '@/constant/value';
import "./Sidebar.scss";
import { faArrowRightFromBracket, faBookMedical, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/authenSlice';
const MenuSidebar = () => {
    let navigate = useNavigate();
    let { user } = useSelector((state) => state.authen);
    let dispatch = useDispatch();
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState("sub2");

    const handleOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (latestOpenKey) {
            setOpenKeys([latestOpenKey]);
        } else {
            setOpenKeys([]);
        }
    };
    const items = [
        {
            type: 'divider',
        },
        {
            key: 'homePageAdmin',
            label: (<NavLink to={PATHS.ADMIN.DASHBOARD}>Trang chủ</NavLink>),
            icon: <HomeOutlined />,
        },
        {
            key: 'personalAdmin',
            label: (<NavLink to={PATHS.ADMIN.PROFILE}>Cá nhân</NavLink>), //style={{ color: selectedKeys === "sub2" ? "red" : "" }}
            icon: <FontAwesomeIcon icon={faAddressCard} />,  // style={{ color: selectedKeys === "sub2" ? "red" : "" }}
            children: [
                {
                    key: 'personalAdmin1',
                    label: 'Thông tin cá nhân',
                    onClick: () => { emitter.emit(EMIT.EVENT_PROFILE.key, EMIT.EVENT_PROFILE.info); }
                },
                {
                    key: 'personalAdmin2',
                    label: 'Đổi mật khẩu',
                    onClick: () => { emitter.emit(EMIT.EVENT_PROFILE.key, EMIT.EVENT_PROFILE.changePassword); }
                },
                ...(user?.staff ? [{
                    key: 'personal3',
                    label: "Hồ sơ",
                    onClick: () => {
                        emitter.emit(EMIT.EVENT_PROFILE.key, EMIT.EVENT_PROFILE.staff);
                    }
                }] : [])
            ],
        },
        {
            key: 'userAdmin',
            label: (<NavLink to={PATHS.ADMIN.STAFF_MANAGE}>Người dùng</NavLink>),
            icon: <UserSwitchOutlined />,
            children: [
                {
                    key: 'userAdmin1',
                    label: (<NavLink to={PATHS.ADMIN.STAFF_MANAGE}>Nhân viên</NavLink>),
                    onClick: (value) => { console.log(value) }
                },
                {
                    key: 'userAdmin2',
                    label: (<NavLink to={PATHS.ADMIN.PATIENT_MANAGE}>Bệnh nhân</NavLink>),
                }
            ],
        },
        {
            key: 'specialtyAdmin',
            label: (<NavLink to={PATHS.ADMIN.SPECIALTY_MANAGE}>Chuyên khoa</NavLink>),
            icon: <FontAwesomeIcon icon={faStethoscope} />,
        },
        {
            key: 'hospitalAdmin',
            label: (<NavLink to={PATHS.ADMIN.ROOM_MANAGE}>Cơ sở ý tế</NavLink>),
            icon: <FontAwesomeIcon icon={faHospital} />,
            children: [
                {
                    key: 'departmentAdmin',
                    label: (<NavLink to={PATHS.ADMIN.DEPARTMENT_MANAGE}>Khoa</NavLink>),
                    // icon: <FontAwesomeIcon icon={faBuilding} />,
                },
                {
                    key: 'roomAdmin',
                    label: (<NavLink to={PATHS.ADMIN.ROOM_MANAGE}>Phòng</NavLink>),
                },
                {
                    key: 'serviceAdmin',
                    label: (<NavLink to={PATHS.ADMIN.SERVICE_MANAGE}>Dịch vụ phòng</NavLink>),
                },
            ],
        },
        {
            key: 'handbookAdmin',
            label: (<NavLink to={PATHS.ADMIN.HANDBOOK_MANAGE}>Cẩm nang sức khỏe</NavLink>),
            icon: <FontAwesomeIcon icon={faBookMedical} />,
        },
        {
            key: 'scheduleAdmin',
            label: (<NavLink to={PATHS.ADMIN.SCHEDULE_MANAGE}>Lịch trực</NavLink>),
            icon: <FontAwesomeIcon icon={faCalendarDays} />,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: ("Đăng xuất"),
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} />,
            onClick: () => { dispatch(logout()); navigate(PATHS.HOME.LOGIN); }
        },
    ];

    return (
        <div className='menu-item'>
            <Menu
                openKeys={openKeys} // Truyền state openKeys vào
                onOpenChange={handleOpenChange}
                mode="inline"
                items={items}
            />
        </div>
    );
}

export default MenuSidebar;