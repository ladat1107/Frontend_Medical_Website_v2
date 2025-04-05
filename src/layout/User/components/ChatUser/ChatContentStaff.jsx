import { Avatar, Button, Form, Input, message, Tooltip } from "antd";
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
import dayjs from "dayjs";
import { convertDateTimeToString } from "@/utils/formatDate";
import { useConversation, useCreateMessage } from "@/hooks";
import SkeletonChatContent from "../../../Receptionist/pages/Messenger/Skeleton/SkeletonChatContent";
import AttachedFile from "@/layout/Doctor/pages/Notification/NotiItem/attachedFile";

const { TextArea } = Input;
const ChatContentStaff = () => {
    const { user } = useSelector(state => state.authen);
    const { data: conversationData, isLoading: conversationLoading, refetch: refetchConversationData, isFetching: isFetchingConversationData } = useConversation()
    const { mutate: createMessage, isPending: isCreatingMessage } = useCreateMessage();
    const [messages, setMessages] = useState([]);
    const [receiver, setReceiver] = useState(null);
    const [showScrollDown, setShowScrollDown] = useState(false);
    const [form] = Form.useForm();
    const chatContentRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        chatContentRef.current?.scrollTo({ top: chatContentRef.current.scrollHeight, behavior: "smooth" });
    };

    useEffect(() => {
        if (!isFetchingConversationData && !isCreatingMessage) {
            setTimeout(() => {
                refetchConversationData();
            }, 2000);
        }
    }, [isFetchingConversationData, isCreatingMessage])

    useEffect(() => {
        if (conversationData?.EC === 0) {
            setMessages(conversationData?.DT?.messageData);
            setReceiver(conversationData?.DT?.staffData);
        }
    }, [conversationData])

    useEffect(() => {
        if (!user || !user?.id) {
            navigate(PATHS.HOME.LOGIN);
            message.info("Vui lòng đăng nhập để nhắn tin với nhân viên hỗ trợ");
        }
    }, [])

    useEffect(() => {
        scrollToBottom();
        if (inputRef.current) inputRef.current.focus();
    }, [messages]);

    const handleScroll = () => {
        if (!chatContentRef.current) return;
        const isAtBottom = chatContentRef.current.scrollTop + chatContentRef.current.clientHeight >= chatContentRef.current.scrollHeight - 50;
        setShowScrollDown(!isAtBottom);
    };

    const sendMessageStaff = async (data) => {
        if (!data.message || !data.message.trim()) return;
        handleCreateMessage(data.message.trim(), null);
    }
    const handleCreateMessage = (content, link) => {
        const message = {
            conversationId: conversationData?.DT?.id,
            senderId: user?.id,
            content: content,
            link: link,
            createdAt: new Date(),
            status: STATUS_MESSAGE.SENDING
        }
        setMessages(pre => [...pre, message]);
        form.resetFields();
        createMessage(message, {
            onSuccess: () => {
                refetchConversationData();
            },
        });
    }

    return (


        <>
            {conversationLoading ? <SkeletonChatContent /> :
                <div className="chat-content" ref={chatContentRef} onScroll={handleScroll}>
                    {messages.length === 0 ? (
                        <div className="empty-chat">
                            <p>Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</p>
                        </div>
                    ) :
                        messages?.map((msg, index) => {
                            const prevMsg = messages[index - 1];
                            const nextMsg = messages[index + 1];
                            const isShowTime = !prevMsg || dayjs(msg.createdAt).diff(dayjs(prevMsg.createdAt), "hour") >= 2;
                            const isShowAvatar = msg.senderId !== user?.id && (msg.senderId !== nextMsg?.senderId || isShowTime)
                            const statusName = msg.status === STATUS_MESSAGE.READ ? "Đã xem" : msg.status === STATUS_MESSAGE.SENT ? "Đã gửi" : msg.status === STATUS_MESSAGE.RECEIVED ? "Đã nhận" : msg.status === STATUS_MESSAGE.SENDING ? "Đang gửi" : "Lỗi";
                            return (
                                <div key={index}>
                                    {isShowTime && (
                                        <div className="text-center text-muted my-3" style={{ fontSize: "12px" }}>
                                            {dayjs(msg.createdAt).format("HH:mm")} {convertDateTimeToString(msg.createdAt)}
                                        </div>
                                    )}

                                    <div className={`chat-message ${msg.senderId === user?.id ? "user" : "bot"}`}>
                                        {isShowAvatar && <Avatar className="chat-avatar" size={30} src={receiver?.avatar} ></Avatar>}
                                        <Tooltip title={statusName + " " + dayjs(msg.createdAt).format("HH:mm") + " " + convertDateTimeToString(msg.createdAt)}
                                            overlayInnerStyle={{ whiteSpace: "nowrap", padding: "6px", width: "fit-content", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                            overlayStyle={{ maxWidth: 'fit-content' }}
                                            placement="bottom"
                                            //  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                            arrow={false}
                                        >
                                            <div className="chat-text">
                                                {msg?.link ?
                                                    <div style={{ marginLeft: isShowAvatar ? "" : "50px" }}>
                                                        {msg.link.includes("image") ?
                                                            <img src={msg?.link} alt="Uploaded" className="chat-image" />
                                                            :
                                                            <AttachedFile
                                                                link={msg.link}
                                                                type={msg?.link?.split(".")?.pop()?.toLowerCase()}
                                                            />}
                                                    </div>
                                                    :
                                                    <span className={`chat-text-content ${msg.senderId === user?.id ? "user" : "bot"}`} style={{ marginLeft: isShowAvatar ? "" : "50px" }}> {msg?.content}</span>
                                                }
                                                {msg.senderId === user?.id && !nextMsg && (
                                                    <div className="message-status">
                                                        {msg.status === STATUS_MESSAGE.SENDING && <span className="d-flex align-items-center gap-1">Đang gửi...</span>}
                                                        {msg.status === STATUS_MESSAGE.SENT && <span className="d-flex align-items-center gap-1">Đã gửi <Check size={10} /></span>}
                                                        {msg.status === STATUS_MESSAGE.RECEIVED && <span className="d-flex align-items-center gap-1">Đã nhận <CheckCheck size={10} /></span>}
                                                        {msg.status === STATUS_MESSAGE.READ && <span className="d-flex align-items-center gap-1">Đã xem</span>}
                                                        {msg.status === STATUS_MESSAGE.FAILED && <span className="d-flex align-items-center gap-1 text-danger">Gửi thất bại</span>}
                                                    </div>
                                                )}
                                            </div>
                                        </Tooltip>
                                    </div>

                                </div >
                            )
                        })}
                    {
                        showScrollDown && (
                            <div className="scroll-to-bottom" onClick={scrollToBottom}>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </div>
                        )
                    }
                </div >}
            <Form form={form} onFinish={sendMessageStaff} className="chat-input-container">
                <Form.Item name="message" style={{ flex: 1, marginBottom: 0 }}>
                    <TextArea
                        className="chat-input"
                        disabled={!user?.id || isCreatingMessage || conversationLoading}
                        autoComplete="off"
                        placeholder="Nhập tin nhắn (tối đa 250 ký tự)..."
                        maxLength={500}
                        ref={inputRef}
                        autoSize={{ maxRows: 4 }}
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
                <Button icon={<SendOutlined />} htmlType="submit"
                    disabled={!user?.id || isCreatingMessage || conversationLoading} />
            </Form>
        </>

    )
}
export default ChatContentStaff;