import { CSV, PDF } from "@/components/TypeFile/typefile";
import { useRef, useEffect, useState } from "react";
import './SendNoti.scss';
import NotificationSelectionModal from "../NotiSelection/notiSelection";
import propTypes from 'prop-types';

const SendNoti = ({dataUser}) => {
    
    const textAreaRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleSubmit = (selectedUsers) => {
        console.log(selectedUsers); 
        setSelectedUsers(selectedUsers);
        setIsModalOpen(false);
    }

    useEffect(() => {
        const handleInput = () => {
            if (textAreaRef.current) {
                textAreaRef.current.style.height = "1em"; 
                textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"; 
            }
        };

        const textArea = textAreaRef.current;
        textArea?.addEventListener("input", handleInput);
        return () => textArea?.removeEventListener("input", handleInput);
    }, []);

    return (
        <div className="send-noti-container">
            <div className="header-send-noti " >
                <textarea
                    ref={textAreaRef}
                    placeholder="Tiêu đề thông báo..."
                    className="send-noti-title"
                />
                <div className="row mt-2">
                    <div className="col-2 d-flex">
                        <p>
                            <i className="fa-regular fa-user" style={{ color: "#787684" }}></i>
                        </p>
                        <p className="ms-2" style={{color: '#787684'}}>Gửi tới:</p>
                    </div>
                    <div className="col-10 d-flex">
                        <button className="add-button" onClick={() => setIsModalOpen(true)}>
                            <i className="fa-solid fa-plus"></i>
                            <p className="ms-2">Thêm</p>
                        </button>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12 d-flex">
                        <p>
                            <i className="fa-regular fa-file-lines" style={{ color: "#787684" }}></i>
                        </p>
                        <p className="ms-2" style={{color: '#787684'}}>Nội dung:</p>
                    </div>
                    <div className="col-12 d-flex">
                        {/* <MarkdownEditor/> */}
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12 d-flex">
                        <p>
                            <i className="fa-solid fa-paperclip" style={{ color: "#787684" }}></i>
                        </p>
                        <p className="ms-2" style={{color: '#787684'}}>Đính kèm:</p>
                    </div>
                    <div className="col-3 mt-2">
                        <div className="attach-file d-flex row">
                            <div className="attach-file-icon col-3" style={{padding: '0px'}}>
                                <CSV/>
                            </div>
                            <div className="col-9" style={{padding: '0px'}}>
                                
                                <p className="attach-file-title">Tên file</p>
                                <p className="attach-file-capacity">15 MB</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 mt-2 d-flex">
                        <button className="add-button" style={{height: '50px', width: '50px'}}>
                            <p>
                                <i className="fa-solid fa-plus"></i>
                            </p>
                        </button>
                    </div>
                </div>
            </div>
            {dataUser && <NotificationSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                data={dataUser}
                checkedUsers={selectedUsers}
            />}
        </div>
    );
};

SendNoti.propTypes = {
    dataUser: propTypes.object.isRequired,
}

export default SendNoti;
