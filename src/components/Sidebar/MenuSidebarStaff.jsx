import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { PATHS } from '@/constant/path';
import { logout } from '@/redux/authenSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { EMIT } from '@/constant/value';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import emitter from '@/utils/eventEmitter';
import { ROLE } from '@/constant/role';

const MenuSidebar = () => {
    let { user } = useSelector(state => state.authen);
    let dispatch = useDispatch();

    const getMenuItem = () => {
        const items = [
            {
                type: 'divider',
            },
            {
                key: 'personalAdmin',
                label: (<NavLink to={PATHS.STAFF.PROFILE}>Cá nhân</NavLink>), //style={{ color: selectedKeys === "sub2" ? "red" : "" }}
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
                    {
                        key: 'personal3',
                        label: "Hồ sơ",
                        onClick: () => {
                            emitter.emit(EMIT.EVENT_PROFILE.key, EMIT.EVENT_PROFILE.staff);
                        }
                    }
                ],
            },
            {
                key: 'sub2',
                label: (<NavLink to={PATHS.RECEPTIONIST.DASHBOARD}>Lịch hẹn</NavLink>),
                icon: <i className="fa-solid fa-list"></i>,
                roles: [ROLE.RECEPTIONIST]
            },
            {
                key: 'sub3',
                label: (<NavLink to={PATHS.RECEPTIONIST.CASHIER}>Thanh toán</NavLink>),
                icon: <i className="fa-solid fa-list"></i>,
                roles: [ROLE.ACCOUNTANT]
            },
            {
                key: 'sub4',
                label: 'Danh sách khám bệnh',
                icon: <i className="fa-solid fa-list"></i>,
                roles: [ROLE.DOCTOR],
                children: [
                    {
                        key: '9',
                        label: (<NavLink to={PATHS.STAFF.APPOINTMENT}>Khám bệnh</NavLink>),
                        icon: <i className="fa-solid fa-stethoscope"></i>,
                    },
                    {
                        key: '10',
                        label: (<NavLink to={PATHS.STAFF.PARACLINICAL}>Cận lâm sàng</NavLink>),
                        icon: <i className="fa-solid fa-microscope"></i>,
                    }
                ],
            },
            {
                key: 'sub1',
                label: (<NavLink to={PATHS.RECEPTIONIST.PRESCRIBE}>Lấy thuốc</NavLink>),
                icon: <i className="fa-solid fa-pills"></i>,
                roles: [ROLE.PHARMACIST]
            },
            {
                key: 'sub5',
                label: (<NavLink to={PATHS.STAFF.HANDBOOK}>Cẩm nang</NavLink>),
                icon: <i className="fa-solid fa-book"></i>,
            },
            {
                key: 'sub6',
                label: (<NavLink to={PATHS.STAFF.SCHEDULE}>Lịch trực</NavLink>),
                icon: <i className="fa-regular fa-calendar"></i>,
            },
            {
                type: 'divider',
            },
            {
                key: 'logout',
                label: ("Đăng xuất"),
                icon: <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} />,
                onClick: () => { dispatch(logout()); }
            },
        ];

        return items.filter(item => {
            // Nếu item không có thuộc tính roles, luôn hiển thị
            if (!item.roles) return true;

            // Kiểm tra nếu vai trò của user nằm trong danh sách roles của item
            return item.roles.includes(user.role);
        });
    }

    const items = getMenuItem();

    const onClick = (e) => {
        // console.log('click ', e);
    };
    return (
        <div className='menu-item'>
            <Menu
                onClick={onClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
        </div>
    );
}

export default MenuSidebar;