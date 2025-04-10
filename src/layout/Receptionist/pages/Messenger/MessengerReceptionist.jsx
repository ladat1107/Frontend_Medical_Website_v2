import { useEffect, useRef, useState } from "react";
import { Layout, Input, Avatar, List, Badge, Dropdown, Button, Form, message, Progress, Tooltip } from "antd";
import { SendOutlined, SearchOutlined, SmileOutlined } from "@ant-design/icons";
import "./MessengerReceptionist.scss";
import { useSelector } from "react-redux";
import { ROLE } from "@/constant/role";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { ArrowLeft, Check, CheckCheck, Image, Paperclip, Smile } from "lucide-react";
import { convertDateTimeToString, timeAgo } from "@/utils/formatDate";
import dayjs from "dayjs";
import { primaryColorAdmin, secondaryColorAdmin } from "@/styles/variables";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
import MessengerSkeleton from "./Skeleton/MessengerSkeleton";
import SkeletonChatContent from "./Skeleton/SkeletonChatContent";
import { STATUS_MESSAGE } from "@/constant/value";
import EmptyContent from "./Skeleton/EmptyContent";
import { uploadFileToCloudinary, uploadToCloudinary } from "@/utils/uploadToCloudinary";
import AttachedFile from "@/layout/Doctor/pages/Notification/NotiItem/attachedFile";
import { useConversation, useConversationForStaff, useCreateMessage } from "@/hooks/useConversations";
import TooltipMessage from "@/components/Tooltip/TooltipMessage";
import EmojiPicker from 'emoji-picker-react';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

const MessengerReceptionist = () => {
    const { user, isLogin } = useSelector((state) => state.authen);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { data: conversationSidebar, isLoading: conversationSidebarLoading } = useConversationForStaff({ enabled: isLogin })
    const [conversationSelected, setConversationSelected] = useState(null);
    const { data: conversationData, isLoading: conversationLoading, refetch: refetchConversationData } = useConversation({ receiverId: conversationSelected?.patientId, enabled: isLogin })
    const { mutate: createMessage, isPending: isCreatingMessage } = useCreateMessage();

    const [hovered, setHovered] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [search, setSearch] = useState("");
    const [conversations, setConversations] = useState([]);
    const [showScrollDown, setShowScrollDown] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const chatContentRef = useRef(null);
    const inputRef = useRef(null);
    const emojiPickerRef = useRef(null);

    const scrollToBottom = () => {
        chatContentRef.current?.scrollTo({ top: chatContentRef.current.scrollHeight, behavior: "smooth" });
    };

    useEffect(() => {
        if (conversationSidebar?.DT?.length > 0 && conversationSidebar?.EC === 0) {
            setConversations(conversationSidebar?.DT);
        }
    }, [conversationSidebar])

    useEffect(() => {
        scrollToBottom();
        if (!user || !user?.id || user?.role !== ROLE.RECEPTIONIST) {
            navigate(PATHS.HOME.LOGIN);
            message.info("Vui lòng đăng nhập để nhắn tin");
        }

        const handleClickOutside = (event) => {
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(event.target)
            ) {
                setShowEmojiPicker(false);
            }
        };

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (conversationData?.EC === 0) {
            setMessages(conversationData?.DT?.messageData || []);
        }
    }, [conversationData])

    useEffect(() => {
        scrollToBottom();
        if (inputRef.current) inputRef.current.focus(); // Tự động focus vào ô input khi mở chat
    }, [messages, isUploading, uploadProgress, isCreatingMessage]);

    // Theo dõi vị trí thanh cuộn và hiển thị nút cuộn xuống nếu cần
    const handleScroll = () => {
        if (!chatContentRef.current) return;
        const isAtBottom = chatContentRef.current.scrollTop + chatContentRef.current.clientHeight >= chatContentRef.current.scrollHeight - 50;
        setShowScrollDown(!isAtBottom);
    };

    const sendMessageStaff = async (data) => {
        if (!data.message || !data.message.trim()) return;
        handleCreateMessage(null, data.message.trim());
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadProgress(0);
        setIsUploading(true);
        try {
            // Gọi hàm upload với callback để cập nhật tiến trình
            const url = await uploadToCloudinary(file, 'Messenger', (progress) => {
                setUploadProgress(progress);
            });
            handleCreateMessage(url, file.name);
        } catch (error) {
            message.error('Tải ảnh lên thất bại, vui lòng thử lại!');
            console.error('Upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    }

    const handleUploadFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadProgress(0);
        setIsUploading(true);
        try {
            const url = await uploadFileToCloudinary(file, 'Messenger', (progress) => {
                setUploadProgress(progress);
            });
            handleCreateMessage(url, file.name);
        } catch (error) {
            message.error('Tải file lên thất bại, vui lòng thử lại!');
            console.error('Upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    }

    const menu = [{ label: "Ẩn", key: "1" }, { label: "Xóa", key: "2" }]

    const handleCreateMessage = (link, content) => {
        const message = {
            conversationId: conversationSelected?.id,
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

    const onEmojiClick = (emojiData) => {
        const currentMessage = form.getFieldValue('message') || '';
        form.setFieldsValue({
            message: currentMessage + emojiData.emoji,
        });
        // Focus lại vào input sau khi chọn emoji
        inputRef.current?.focus();
    };

    return (
        <Layout className="chat-container">
            {conversationLoading || conversationSidebarLoading ? (
                <MessengerSkeleton />
            ) :
                (
                    <>
                        <Sider width={300} className="chat-sidebar">
                            <Header color={primaryColorAdmin} className="chat-header">
                                <ArrowLeft style={{ cursor: 'pointer' }} onClick={() => navigate(PATHS.STAFF.DASHBOARD)} />
                                <span>Danh sách tin nhắn</span>
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
                                renderItem={(item) =>
                                (<List.Item
                                    className={`chat-list-item ${conversationSelected?.patientId === item.patientId ? 'active' : ''}`}
                                    onClick={() => {
                                        setConversationSelected(item);
                                    }}
                                    onMouseEnter={() => setHovered(item.id)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Badge>
                                                <Avatar size={40} src={item?.patientData?.avatar || ""} />
                                            </Badge>
                                        }
                                        title={<div className="d-flex align-items-center justify-content-between">
                                            <span>{item?.patientData?.lastName + " " + item?.patientData?.firstName}</span>
                                            {hovered === item.id ?
                                                <Dropdown menu={{ items: menu }} trigger={["click"]} className="chat-more-icon">
                                                    <FontAwesomeIcon icon={faEllipsis} />
                                                </Dropdown> : <span style={{ fontSize: "9px", color: "gray" }}> {timeAgo(item?.updatedAt).replace("trước", "")}</span>}
                                        </div>}
                                        description={
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span style={{ fontSize: "12px", color: item?.messageData?.length > 0 ? "black" : "gray", overflowX: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>{item.lastMessage}</span>
                                                {item?.messageData?.length > 0 && item?.id !== conversationSelected?.id && (
                                                    <Badge count={item.messageData.length} offset={[0, 0]} />
                                                )}
                                            </div>}
                                    />
                                </List.Item>
                                )}
                            />
                        </Sider>
                        {!conversationSelected ?
                            <EmptyContent /> :
                            <Layout className="chat-main">
                                <Header className="chat-header">
                                    <div className="user-info">
                                        <Avatar src={conversationSelected?.patientData?.avatar || ""} />
                                        <span className="name">
                                            {conversationSelected?.patientData?.lastName + " " + conversationSelected?.patientData?.firstName}
                                        </span>
                                    </div>
                                </Header>
                                <Content className="chat-content" ref={chatContentRef} onScroll={handleScroll}>
                                    {conversationLoading ? <SkeletonChatContent /> :
                                        (
                                            <>
                                                {messages.length > 0 ? messages.map((msg, index) => {
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

                                                            <div className={`d-flex align-items-center mb-1 ${msg.senderId === user?.id ? "flex-row-reverse" : "justify-content-start"}`}>
                                                                {isShowAvatar && (
                                                                    <Avatar
                                                                        className={`chat-avatar`}
                                                                        size={30}
                                                                        src={conversationSelected?.patientData?.avatar}
                                                                    />)}

                                                                {msg?.link ?
                                                                    <div style={{ marginLeft: isShowAvatar ? "" : "35px", width: "100%", display: "flex", justifyContent: msg.senderId === user?.id ? "flex-end" : "flex-start" }}>
                                                                        {msg.link.includes("image") ?
                                                                            <TooltipMessage statusName={statusName} createdAt={msg.createdAt}>
                                                                                <img src={msg?.link} alt="Uploaded" onClick={() => window.open(msg?.link, "_blank")} className="chat-image" />
                                                                            </TooltipMessage>
                                                                            :
                                                                            <AttachedFile
                                                                                link={msg.link}
                                                                                type={msg?.link?.split(".")?.pop()?.toLowerCase()}
                                                                            />
                                                                        }
                                                                    </div>
                                                                    :
                                                                    <div className={`chat-message ${msg.senderId === user?.id ? "reception" : "user"}`} style={{ marginLeft: isShowAvatar ? "" : "35px", borderRadius: msg.content.length > 110 ? "20px" : "50px" }}>
                                                                        <TooltipMessage statusName={statusName} createdAt={msg.createdAt}>
                                                                            {msg.content}
                                                                        </TooltipMessage>
                                                                    </div>}
                                                            </div>

                                                            {!nextMsg && msg.senderId === user?.id && !isUploading && (
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
                                                }) : <div className="text-center text-muted my-3" style={{ fontSize: "15px" }}>  Hãy bắt đầu cuộc trò chuyện với bệnh nhân</div>
                                                }
                                                {isUploading && (
                                                    <div className="d-flex flex-row-reverse">
                                                        <div className="d-flex flex-column align-items-end" style={{ width: "70%" }}>
                                                            <div style={{ marginTop: '8px', width: '40%', height: "40px" }}>
                                                                <Progress percent={uploadProgress} status="active" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                                }
                                            </>
                                        )}
                                    {showScrollDown && (
                                        <div className="scroll-to-bottom" onClick={scrollToBottom}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                        </div>
                                    )}
                                </Content>
                                <Form form={form} onFinish={sendMessageStaff} className="chat-input-container">
                                    <div className="d-flex align-items-center gap-2">
                                        <div>
                                            <Image htmlFor={`input-upload-image-messenger`} onClick={() => document.getElementById(`input-upload-image-messenger`).click()} size={20} style={{ color: "gray", cursor: "pointer", paddingTop: "2px" }} />
                                            <input type="file" id={`input-upload-image-messenger`} hidden={true} onChange={handleImageUpload} accept="image/*" />
                                        </div>
                                        <div>
                                            <Paperclip htmlFor={`input-upload-file-messenger`} onClick={() => document.getElementById(`input-upload-file-messenger`).click()}
                                                size={20} style={{ color: "gray", cursor: "pointer", paddingTop: "2px" }} />
                                            <input type="file" id={`input-upload-file-messenger`} hidden={true} onChange={handleUploadFile}
                                                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation" />
                                        </div>
                                    </div>
                                    <Form.Item name="message" style={{ margin: 0, flex: 1 }}>
                                        <TextArea
                                            className="chat-input"
                                            autoComplete="off"
                                            disabled={isUploading}
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
                                    <div ref={emojiPickerRef} style={{ position: 'relative' }}>
                                        <Smile
                                            size={20}
                                            style={{ color: 'gray', cursor: 'pointer', paddingTop: '2px' }}
                                            onClick={() => setShowEmojiPicker(prev => !prev)}
                                        />
                                        {showEmojiPicker && (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '50px', // đẩy lên trên icon
                                                    right: 0,       // sát phải icon// đẩy sang trái hoàn toàn
                                                    zIndex: 999,
                                                }}
                                            >
                                                <EmojiPicker onEmojiClick={onEmojiClick} skinTonesDisabled={true} previewConfig={{ showPreview: false }} />
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        icon={<SendOutlined />}
                                        htmlType="submit"
                                        disabled={isUploading}
                                        className="send-button"
                                    />
                                </Form>
                            </Layout>
                        }
                    </>
                )
            }

        </Layout >
    );
};

export default MessengerReceptionist;
