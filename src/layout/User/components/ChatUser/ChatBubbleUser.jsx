import { useState } from "react";
import { Drawer } from "antd";
import { MessageOutlined, CloseOutlined } from "@ant-design/icons";
import "./ChatBubbleUser.scss";
import { clearContent } from "@/redux/chatSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import DropdownSelectMessage from "../Dropdown/DropdownSelectMessage";
import ChatContentAI from "./ChatContentAI";
import ChatContentStaff from "./ChatContentStaff";
import { useSelector } from "react-redux";

const ChatBubbleUser = () => {
  const { user } = useSelector(state => state.authen)
  const [typeMessage, setTypeMessage] = useState(2);
  const [visible, setVisible] = useState(false);

  return (
    <div className="chat-bubble-container">
      <div className="chat-toggle" onClick={() => setVisible(!visible)}>
        {visible ? <CloseOutlined /> : <MessageOutlined />}
      </div>
      <Drawer
        className="chat-drawer"
        title={<div className="chat-title">
          <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faXmark} onClick={() => setVisible(false)} />
          <div className="title" >Hỗ trợ trực tuyến
            {!user?.staff && <DropdownSelectMessage typeMessage={typeMessage} setTypeMessage={(value) => setTypeMessage(value)} />}
          </div>
          <FontAwesomeIcon style={{ cursor: "pointer", color: "gray" }} icon={faTrashCan} onClick={() => dispatch(clearContent())} />
        </div>}
        placement="right"
        width={window.innerWidth > 700 ? 600 : '100vw'}
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
      >
        {typeMessage === 1 ? <ChatContentStaff /> : <ChatContentAI />}
      </Drawer>
    </div>
  );
};

export default ChatBubbleUser;
