import React, { useEffect, useState } from 'react';
import { Layout, message, theme } from 'antd';
import './Doctor.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROLE } from '@/constant/role';
import { PATHS } from '@/constant/path';
import DoctorHeader from './components/DoctorHeader';
import DoctorFooter from './components/DoctorFooter';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/authenSlice';
import Sidebar from '@/components/Sidebar/SidebarAdmin';
const { Content } = Layout;

const DoctorLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    let { user } = useSelector((state) => state.authen);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (!user || user.role === ROLE.ADMIN || user.role === ROLE.PATIENT) {
            dispatch(logout());
            message.success("Đăng xuất thành công");
            navigate(PATHS.HOME.LOGIN);
        }
    }, [location]);

    // Cập nhật kích thước màn hình khi thay đổi
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup để gỡ bỏ sự kiện khi component bị hủy
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const action = (value) => {
        setCollapsed(value);
    }
    const isMobileView = screenWidth < 700;
    return (
        <>
            <div className='doctor-content'>
                <Layout>
                    <Sidebar open={collapsed}
                        action={action} />
                    <Layout style={{ marginLeft: !isMobileView && !collapsed ? 250 : 0 }}>
                        <DoctorHeader
                            open={collapsed}
                            action={action} />
                        <div className='content-data'>
                            <Content
                                style={{
                                    margin: '24px 16px 0',
                                }}>
                                <Outlet />
                            </Content>
                        </div>
                        <DoctorFooter />
                    </Layout>
                </Layout>
            </div>
        </>
    )
}

export default DoctorLayout