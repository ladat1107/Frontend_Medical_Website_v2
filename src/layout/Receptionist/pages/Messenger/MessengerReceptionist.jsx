import { useState } from "react";
import { Layout, Input, Avatar, List, Badge, Dropdown, Menu, Upload, Button } from "antd";
import { SendOutlined, UserOutlined, MoreOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import "./MessengerReceptionist.scss";

const { Header, Sider, Content } = Layout;

const conversations = [
    { id: 1, name: "Nguyễn Văn A", lastMessage: "Xin chào", unread: 2 },
    { id: 2, name: "Trần Thị B", lastMessage: "Hẹn gặp lại", unread: 0 },
];

const MessengerReceptionist = () => {
    const [messages, setMessages] = useState([
        { sender: "user", text: "Chào bác sĩ!" },
        { sender: "reception", text: "Xin chào, tôi có thể giúp gì cho bạn?" },
    ]);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { sender: "reception", text: input }]);
        setInput("");
    };

    const handleUpload = (file) => {
        setMessages([...messages, { sender: "reception", text: "📷 Hình ảnh", image: URL.createObjectURL(file) }]);
        return false;
    };

    const menu = (
        <Menu>
            <Menu.Item key="1">Ẩn</Menu.Item>
            <Menu.Item key="2">Xóa</Menu.Item>
        </Menu>
    );

    return (
        <Layout className="chat-container">
            <Sider width={300} className="chat-sidebar">
                <Header className="chat-header">Danh sách chat</Header>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Tìm kiếm bệnh nhân..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="chat-search"
                />
                <List
                    itemLayout="horizontal"
                    dataSource={conversations}
                    renderItem={(item) => (
                        <List.Item className="chat-list-item">
                            <List.Item.Meta
                                avatar={
                                    <Badge count={item.unread}>
                                        <Avatar icon={<UserOutlined />} />
                                    </Badge>
                                }
                                title={item.name}
                                description={item.lastMessage}
                            />
                            <Dropdown overlay={menu} trigger={["click"]}>
                                <MoreOutlined className="chat-more-icon" />
                            </Dropdown>
                        </List.Item>
                    )}
                />
            </Sider>
            <Layout>
                <Header className="chat-header">Nguyễn Văn A</Header>
                <Content className="chat-content">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender}`}>
                            {msg.image ? <img src={msg.image} alt="Uploaded" className="chat-image" /> : msg.text}
                        </div>
                    ))}
                </Content>
                <div className="chat-input-container">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onPressEnter={sendMessage}
                        placeholder="Nhập tin nhắn..."
                    />
                    <Upload beforeUpload={handleUpload} showUploadList={false}>
                        <Button icon={<UploadOutlined />} />
                    </Upload>
                    <SendOutlined className="send-icon" onClick={sendMessage} />
                </div>
            </Layout>
        </Layout>
    );
};

export default MessengerReceptionist;
