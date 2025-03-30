import { useEffect, useRef, useState } from "react";
import { Layout, Input, Avatar, List, Badge, Dropdown, Menu, Upload, Button, Form, message, Spin, Tooltip } from "antd";
import { SendOutlined, MoreOutlined, SearchOutlined, MenuOutlined } from "@ant-design/icons";
import "./MessengerReceptionist.scss";
import { useSelector } from "react-redux";
import { ROLE } from "@/constant/role";
import useChatSocket from "@/hooks/useChatSocket";
import { useMutation } from "@/hooks/useMutation";
import { getConversationsForStaff } from "@/services/doctorService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { ArrowLeft, Check, CheckCheck, Image } from "lucide-react";
import { convertDateTimeToString, timeAgo } from "@/utils/formatDate";
import dayjs from "dayjs";
import { primaryColorAdmin, secondaryColorAdmin } from "@/styles/variables";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
import MessengerSkeleton from "./Skeleton/MessengerSkeleton";
import SkeletonChatContent from "./Skeleton/SkeletonChatContent";
import { STATUS_MESSAGE } from "@/constant/value";

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

const MessengerReceptionist = () => {
    const { user } = useSelector((state) => state.authen);
    const [form] = Form.useForm();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showSidebar, setShowSidebar] = useState(!isMobile);
    const { data: conversationData, loading: conversationLoading, execute: fetchConversations } = useMutation(() => getConversationsForStaff())
    const [showScrollDown, setShowScrollDown] = useState(false);
    const chatContentRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const typingTimeoutRef = useRef(null);

    const [search, setSearch] = useState("");
    const [conversations, setConversations] = useState([]);
    const [conversationSelected, setConversationSelected] = useState(conversationData?.DT[0] || null);
    const {
        messages,
        sendMessage,
        isConnected,
        joinedRoom,
        loading: chatLoading,
        error,
        isTyping,
        startTyping,
        stopTyping
    } = useChatSocket(conversationSelected?.patientId);

    useEffect(() => {
        scrollToBottom();
        if (!user || !user?.id || user?.role !== ROLE.RECEPTIONIST) {
            navigate(PATHS.HOME.LOGIN);
            message.info("Vui lòng đăng nhập để nhắn tin");
        } else {
            fetchConversations();
        }
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            setShowSidebar(!isMobile);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (conversationData?.DT?.length > 0 && conversationData?.EC === 0) {
            setConversations(conversationData?.DT);
            setConversationSelected(conversationData?.DT[0]);
        }
    }, [conversationData])

    const scrollToBottom = () => {
        chatContentRef.current?.scrollTo({ top: chatContentRef.current.scrollHeight, behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        if (inputRef.current) inputRef.current.focus(); // Tự động focus vào ô input khi mở chat
    }, [messages]);
    useEffect(() => {
        if (error) {
            message.error(`Lỗi kết nối: ${error}`);
        }
    }, [error]);
    // Theo dõi vị trí thanh cuộn và hiển thị nút cuộn xuống nếu cần
    const handleScroll = () => {
        if (!chatContentRef.current) return;
        const isAtBottom = chatContentRef.current.scrollTop + chatContentRef.current.clientHeight >= chatContentRef.current.scrollHeight - 50;
        setShowScrollDown(!isAtBottom);
    };

    const sendMessageStaff = async (data) => {
        if (!data.message || !data.message.trim()) return;

        const success = sendMessage({
            userId: user?.id,
            content: data.message.trim(),
            link: null
        });

        if (success) {
            form.resetFields();
        } else {
            message.error("Không thể gửi tin nhắn, vui lòng thử lại sau");
        }
    }

    const handleUpload = (file) => {
        setMessages([...messages, { sender: "reception", content: "📷 Hình ảnh", image: URL.createObjectURL(file) }]);
        return false;
    };

    const menu = (
        <Menu>
            <Menu.Item key="1">Ẩn</Menu.Item>
            <Menu.Item key="2">Xóa</Menu.Item>
        </Menu>
    );

    const handleInputChange = () => {
        if (!isConnected || !joinedRoom) return;

        startTyping();

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            stopTyping();
        }, 2000);
    };

    return (
        <Layout className="chat-container">
            {conversationLoading ? (
                <MessengerSkeleton />
            ) :
                showSidebar && (
                    <Sider width={300} className="chat-sidebar">
                        <Header color={primaryColorAdmin} className="chat-header">
                            <ArrowLeft style={{ cursor: 'pointer' }} onClick={() => navigate(PATHS.STAFF.DASHBOARD)} />
                            <span>Danh sách chat</span>
                        </Header>
                        <div className="p-2 mb-2">
                            <Input
                                prefix={<SearchOutlined />}
                                placeholder="Tìm kiếm bệnh nhân..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="chat-search"
                            />
                        </div>
                        <List
                            itemLayout="horizontal"
                            style={{ overflowY: "scroll", maxHeight: "calc(100vh - 100px)" }}
                            dataSource={conversations}
                            renderItem={(item) => (
                                <List.Item
                                    className={`chat-list-item ${conversationSelected?.patientId === item.patientId ? 'active' : ''}`}
                                    onClick={() => {
                                        setConversationSelected(item);
                                        if (isMobile) setShowSidebar(false);
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Badge count={item.unread}>
                                                <Avatar size={40} src={item?.patientData?.avatar || ""} />
                                            </Badge>
                                        }
                                        title={<div className="d-flex align-items-center justify-content-between">
                                            <span>{item?.patientData?.lastName + " " + item?.patientData?.firstName}</span>
                                            <span style={{ fontSize: "9px", color: "gray" }}> {timeAgo(item?.updatedAt)}</span>
                                        </div>}
                                        description={<div className="d-flex align-items-center justify-content-between">
                                            <span style={{ fontSize: "12px", color: "gray", overflowX: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>{item.lastMessage}</span>
                                        </div>}
                                    />
                                    <Dropdown overlay={menu} trigger={["click"]} className="chat-more-icon">
                                        <MoreOutlined />
                                    </Dropdown>
                                </List.Item>
                            )}
                        />
                    </Sider>
                )}
            {!conversationLoading && <Layout className="chat-main">
                <Header className="chat-header">
                    {!showSidebar && isMobile && (
                        <Button
                            type="text"
                            icon={<MenuOutlined />}
                            onClick={() => setShowSidebar(true)}
                            className="me-3"
                        />
                    )}
                    <div className="user-info">
                        <Avatar src={conversationSelected?.patientData?.avatar || ""} />
                        <span className="name">
                            {conversationSelected?.patientData?.lastName + " " + conversationSelected?.patientData?.firstName}
                        </span>
                    </div>
                </Header>
                <Content className="chat-content" ref={chatContentRef} onScroll={handleScroll}>
                    {chatLoading ? <SkeletonChatContent /> :
                        (
                            <>
                                {messages.map((msg, index) => {
                                    const prevMsg = messages[index - 1];
                                    const nextMsg = messages[index + 1];
                                    const isShowTime = !prevMsg || dayjs(msg.createdAt).diff(dayjs(prevMsg.createdAt), "hour") >= 2;
                                    const isShowAvatar = msg.senderId !== user?.id && (msg.senderId !== nextMsg?.senderId || isShowTime)
                                    return (
                                        <div key={index}>
                                            {isShowTime && (
                                                <div className="text-center text-muted my-3" style={{ fontSize: "12px" }}>
                                                    {dayjs(msg.createdAt).format("HH:mm")} {convertDateTimeToString(msg.createdAt)}
                                                </div>
                                            )}

                                            <div className={`d-flex align-items-center mb-1 ${msg.senderId === user?.id ? "flex-row-reverse" : "justify-content-start"}`}>
                                                {isShowAvatar && (
                                                    <Avatar
                                                        className={`chat-avatar`}
                                                        size={30}
                                                        src={conversationSelected?.patientData?.avatar}
                                                    />)}
                                                <Tooltip title={dayjs(msg.createdAt).format("HH:mm") + " " + convertDateTimeToString(msg.createdAt)}
                                                    overlayInnerStyle={{ whiteSpace: "nowrap", padding: "6px", width: "fit-content", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                                    overlayStyle={{ maxWidth: 'fit-content' }}
                                                    placement="bottom"
                                                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                                    arrow={false}
                                                >
                                                    <div className={`chat-message ${msg.senderId === user?.id ? "reception" : "user"}`} style={{ marginLeft: isShowAvatar ? "" : "35px", borderRadius: msg.content.length > 110 ? "20px" : "50px" }}>
                                                        {msg.link ? (
                                                            <img src={msg.link} alt="Uploaded" className="chat-image" />
                                                        ) : (
                                                            msg.content
                                                        )}
                                                    </div>
                                                </Tooltip>
                                            </div>
                                            {!nextMsg && msg.senderId === user?.id && (
                                                <div className="text-end text-muted mt-2" style={{ fontSize: "10px", color: secondaryColorAdmin }}>
                                                    {msg.status === STATUS_MESSAGE.SENDING && <span className="d-flex align-items-center justify-content-end gap-1 me-3">Đang gửi...</span>}
                                                    {msg.status === STATUS_MESSAGE.SENT && <span className="d-flex align-items-center justify-content-end gap-1 me-3">Đã gửi <Check size={10} /></span>}
                                                    {msg.status === STATUS_MESSAGE.RECEIVED && <span className="d-flex align-items-center justify-content-end gap-1 me-3">Đã nhận <CheckCheck size={10} /></span>}
                                                    {msg.status === STATUS_MESSAGE.READ &&
                                                        <span className="d-flex align-items-center justify-content-end gap-2 me-1">
                                                            Đã xem <Avatar style={{ border: `1px solid ${primaryColorAdmin}` }} size={17} src={conversationSelected?.patientData?.avatar} />
                                                        </span>}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                                {isTyping && (
                                    <div className="typing-indicator">
                                        <span>Đang nhập tin nhắn...</span>
                                    </div>
                                )}
                            </>
                        )}
                    {showScrollDown && (
                        <div className="scroll-to-bottom" onClick={scrollToBottom}>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                    )}
                </Content>
                <Form form={form} onFinish={sendMessageStaff} className="chat-input-container">
                    <Upload beforeUpload={handleUpload} showUploadList={false} icon={<Image />}>
                        <Image size={20} style={{ color: "gray", cursor: "pointer", paddingTop: "2px" }} />
                    </Upload>
                    <Form.Item name="message" style={{ margin: 0, flex: 1 }}>
                        <TextArea
                            className="chat-input"
                            autoComplete="off"
                            disabled={!isConnected || !joinedRoom}
                            placeholder="Nhập tin nhắn (tối đa 250 ký tự)..."
                            maxLength={500}
                            ref={inputRef}
                            autoSize={{ maxRows: 4 }}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.altKey) {
                                    e.preventDefault();
                                    form.submit();
                                } else if (e.key === "Enter" && e.altKey) {
                                    const { value } = e.target;
                                    form.setFieldsValue({ message: `${value}\n` });
                                }
                            }}
                        />
                    </Form.Item>
                    <Button
                        icon={<SendOutlined />}
                        htmlType="submit"
                        disabled={!isConnected || !joinedRoom}
                        className="send-button"
                    />
                </Form>
            </Layout>}
        </Layout>
    );
};

export default MessengerReceptionist;
