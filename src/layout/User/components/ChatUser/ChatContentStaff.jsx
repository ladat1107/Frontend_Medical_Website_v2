import useChatSocket from "@/hooks/useChatSocket";
import { Avatar, Button, Form, Input, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SendOutlined } from "@ant-design/icons";
import "./ChatBubbleUser.scss";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Check, CheckCheck } from "lucide-react";
import { STATUS_MESSAGE } from "@/constant/value";
import { PATHS } from "@/constant/path";

const { TextArea } = Input;
const ChatContentStaff = () => {
    const { user } = useSelector(state => state.authen);
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
    } = useChatSocket();
    const [showScrollDown, setShowScrollDown] = useState(false);
    const [form] = Form.useForm();
    const chatContentRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        if (!user || !user?.id) {
            navigate(PATHS.HOME.LOGIN);
            message.info("Vui lòng đăng nhập để nhắn tin với nhân viên hỗ trợ");
        }
    }, [])

    useEffect(() => {
        if (error) {
            message.error(`Lỗi kết nối: ${error}`);
        }
    }, [error]);

    const scrollToBottom = () => {
        chatContentRef.current?.scrollTo({ top: chatContentRef.current.scrollHeight, behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        if (inputRef.current) inputRef.current.focus();
    }, [messages]);

    const handleScroll = () => {
        if (!chatContentRef.current) return;
        const isAtBottom = chatContentRef.current.scrollTop + chatContentRef.current.clientHeight >= chatContentRef.current.scrollHeight - 50;
        setShowScrollDown(!isAtBottom);
    };

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

    return (
        <>
            <div className="connection-status">
                {!isConnected &&
                    <div className="connection-alert">Đang kết nối lại...</div>
                }
            </div>
            <div className="chat-content" ref={chatContentRef} onScroll={handleScroll}>
                {messages.length === 0 && !chatLoading ? (
                    <div className="empty-chat">
                        <p>Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</p>
                    </div>
                ) :
                    messages?.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.senderId === user?.id ? "user" : "bot"}`}>
                            <Avatar className="chat-avatar" size={30}>{msg.senderId === user?.id ? "👤" : "🤖"}</Avatar>
                            <div className="chat-text">
                                <span className={`chat-text-content ${msg.senderId === user?.id ? "user" : "bot"}`}>{msg?.content}</span>
                                {msg?.link && (
                                    <div className="chat-links">
                                        {msg?.link?.map((linkItem, linkIndex) => (
                                            <Link
                                                key={linkIndex}
                                                to={linkItem?.url}
                                                onClick={() => setVisible(false)}
                                                className="chat-link-button"
                                            >
                                                {linkItem?.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                {msg.senderId === user?.id && (
                                    <div className="message-status">
                                        {msg.status === STATUS_MESSAGE.SENDING && <span className="d-flex align-items-center gap-1">Đang gửi...</span>}
                                        {msg.status === STATUS_MESSAGE.SENT && <span className="d-flex align-items-center gap-1">Đã gửi <Check size={10} /></span>}
                                        {msg.status === STATUS_MESSAGE.RECEIVED && <span className="d-flex align-items-center gap-1">Đã nhận <CheckCheck size={10} /></span>}
                                        {msg.status === STATUS_MESSAGE.READ && <span className="d-flex align-items-center gap-1">Đã xem</span>}
                                        {msg.status === STATUS_MESSAGE.FAILED && <span className="d-flex align-items-center gap-1 text-danger">Gửi thất bại</span>}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                {chatLoading && (
                    <div className="chat-message bot">
                        <Avatar className="chat-avatar" size={30}>🤖</Avatar>
                        <div className="chat-loading">
                            <span className="dot-animation">
                                <span>●</span><span>●</span><span>●</span></span>
                        </div>
                    </div>
                )}
                {isTyping && (
                    <div className="typing-indicator">
                        <span>Đang nhập tin nhắn...</span>
                    </div>
                )}
                {showScrollDown && (
                    <div className="scroll-to-bottom" onClick={scrollToBottom}>
                        <FontAwesomeIcon icon={faArrowDown} />
                    </div>
                )}
            </div>
            <Form form={form} onFinish={sendMessageStaff} className="chat-input-container">
                <Form.Item name="message" style={{ flex: 1, marginBottom: 0 }}>
                    <TextArea
                        className="chat-input"
                        disabled={!isConnected || !joinedRoom}
                        autoComplete="off"
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
                <Button icon={<SendOutlined />} htmlType="submit" disabled={!isConnected || !joinedRoom} />
            </Form>
        </>
    )
}
export default ChatContentStaff;