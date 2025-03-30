import { Avatar, Button, Form, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendOutlined } from "@ant-design/icons";
import "./ChatBubbleUser.scss";
import { clearContent, setChatLoading, setContent } from "@/redux/chatSlice";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import MarkdownIt from 'markdown-it';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userService from "@/services/userService";
const { TextArea } = Input;

const ChatContentAI = () => {
    const { content, chatLoading } = useSelector(state => state.chat);
    const [showScrollDown, setShowScrollDown] = useState(false); // Hiển thị mũi tên cuộn xuống
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const chatContentRef = useRef(null); // Tham chiếu vùng nội dung chat
    const inputRef = useRef(null);

    const mdParser = new MarkdownIt({
        html: true, // Cho phép xử lý HTML
        linkify: true, // Tự động nhận diện link
        breaks: true,  // Xử lý xuống dòng thành <br/>
    })

    const scrollToBottom = () => {
        chatContentRef.current?.scrollTo({ top: chatContentRef.current.scrollHeight, behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom(); // Nếu không cuộn lên, tự động cuộn xuống
        if (inputRef.current) inputRef.current.focus(); // Tự động focus vào ô input khi mở chat
    }, [content]);

    // Theo dõi vị trí thanh cuộn và hiển thị nút cuộn xuống nếu cần
    const handleScroll = () => {
        if (!chatContentRef.current) return;
        const isAtBottom = chatContentRef.current.scrollTop + chatContentRef.current.clientHeight >= chatContentRef.current.scrollHeight - 50;
        setShowScrollDown(!isAtBottom);
    };

    const sendMessageAI = async (data) => {
        if (!data.message) return;

        let history = [...content];
        const userMessage = { sender: "user", text: data.message };
        dispatch(setContent([...content, userMessage])); // Lưu tin nhắn của user vào Redux
        form.resetFields();
        dispatch(setChatLoading(true)); // Hiển thị loading khi chờ phản hồi từ bot
        try {
            const response = await userService.sendMessage({ message: data.message, history: history.slice(-8) })
            if (response?.EC !== 0) return;
            const botResponse = { sender: "bot", text: response?.DT?.text?.trim(), link: response?.DT?.link || [{}] };
            dispatch(setContent([...content, userMessage, botResponse]));
        } catch (error) {
            clearContent(); // Xóa nội dung chat nếu có lỗi
        } finally {
            dispatch(setChatLoading(false)); // Tắt loading sau khi bot phản hồi
        }
    };
    return (
        <>
            <div className="chat-content" ref={chatContentRef} onScroll={handleScroll}>
                {content?.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`}>
                        <Avatar className="chat-avatar" size={30}>{msg.sender === "bot" ? "🤖" : "👤"}</Avatar>
                        <div className="chat-text">
                            <span className={`chat-text-content ${msg.sender}`} dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(mdParser.render(msg?.text)),
                            }}></span>

                            {msg?.link && msg?.link.length > 0 && (
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
                {showScrollDown && (
                    <div className="scroll-to-bottom" onClick={scrollToBottom}>
                        <FontAwesomeIcon icon={faArrowDown} />
                    </div>
                )}
            </div>
            <Form form={form} onFinish={sendMessageAI} className="chat-input-container">
                <Form.Item name="message" style={{ flex: 1, marginBottom: 0 }}>
                    <TextArea
                        className="chat-input"
                        autoComplete="off"
                        placeholder="Nhập tin nhắn (tối đa 250 ký tự)..."
                        maxLength={500}
                        ref={inputRef}
                        autoSize={{ maxRows: 4 }} // Giới hạn tối đa 4 hàng
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.altKey) {
                                e.preventDefault(); // Ngăn xuống dòng mặc định
                                form.submit(); // Gửi tin nhắn khi nhấn Enter
                            } else if (e.key === "Enter" && e.altKey) {
                                const { value } = e.target;
                                form.setFieldsValue({ message: `${value}\n`, });// Thêm ký tự xuống dòng
                            }
                        }}
                    />
                </Form.Item>
                <Button icon={<SendOutlined />} htmlType="submit" />
            </Form>
        </>
    )
}
export default ChatContentAI;