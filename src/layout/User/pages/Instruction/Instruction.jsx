// src/components/Instruction.jsx
import React from "react";
import { Table, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import "./Instruction.scss";

const { Title, Paragraph } = Typography;

const Instruction = () => {
    // Dữ liệu cho tài khoản và vai trò
    const data = [
        {
            key: "1",
            role: "Quản trị viên",
            description: "Quản lý toàn bộ hệ thống, bao gồm người dùng và nội dung.",
            email: "admin@gmail.com",
            password: "123456",
        },
        {
            key: "2",
            role: "Bác sĩ",
            description: "Khám bệnh tạo đơn thuốc, tạo đơn cận lâm sàn.",
            email: "doctorCuong@gmail.com",
            password: "123456",
        },
        {
            key: "3",
            role: "Bác sĩ cận lâm sàn",
            description: "Thêm kết quả xét nghiệm.",
            email: "doctorLan@gmail.com",
            password: "123456",
        },
        {
            key: "4",
            role: "Tiếp nhận",
            description: "Quản lý lịch hẹn, tạo phiếu khám bệnh.",
            email: "receptionist@gmail.com",
            password: "123456",
        },
        {
            key: "5",
            role: "Thanh toán",
            description: "Thanh toán.",
            email: "accountant@gmail.com",
            password: "123456",
        },
        {
            key: "5",
            role: "Dược sĩ",
            description: "Xem đơn thuốc, thanh toán.",
            email: "receptionist@gmail.com",
            password: "123456",
        },
        {
            key: "6",
            role: "Người dùng",
            description: "Sử dụng website.",
            email: "ladat01626362980@gmail.com",
            password: "123456",
        },
    ];

    // Cột của bảng
    const columns = [
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Mật khẩu",
            dataIndex: "password",
            key: "password",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },

    ];

    return (
        <div className="instruction">
            <div className="user-guide">
                <Title level={3} style={{ color: "#00B5F1" }}>
                    Các tài khoản đăng nhập vào hệ thống
                </Title>
                <p>Website hiện tại đang được triển khai miễn phí với một số tính năng bị hạn chế (chỉ có thể xem). Để trải nghiệm đầy đủ tính năng, vui lòng sử dụng source code từ GitHub.</p>
                <Table columns={columns} dataSource={data} pagination={false} />
            </div>
        </div>
    );
};

export default Instruction;
