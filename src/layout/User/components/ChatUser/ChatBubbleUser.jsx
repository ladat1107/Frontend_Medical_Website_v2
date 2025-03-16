import { useState } from "react";
import { Drawer, Input, Button, Avatar } from "antd";
import { SendOutlined, MessageOutlined, CloseOutlined } from "@ant-design/icons";
import "./ChatBubbleUser.scss";

const ChatBubbleUser = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="chat-bubble-container">
      <div className="chat-toggle" onClick={() => setVisible(!visible)}>
        {visible ? <CloseOutlined /> : <MessageOutlined />}
      </div>
      <Drawer
        className="chat-drawer"
        title={<div className="chat-title">Hỗ trợ trực tuyến</div>}
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <div className="chat-content">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <Avatar className="chat-avatar" size={30}>
                {msg.sender === "bot" ? "🤖" : "👤"}
              </Avatar>
              <div className="chat-text">{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={sendMessage}
            placeholder="Nhập tin nhắn..."
          />
          <Button icon={<SendOutlined />} onClick={sendMessage} />
        </div>
      </Drawer>
    </div>
  );
};

export default ChatBubbleUser;
