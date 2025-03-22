import { CSV, PDF, DOCX, JPG, PNG, RAR, TXT, PPT, XLS } from "@/components/TypeFile/typefile";
import { useRef, useEffect, useState } from "react";
import './SendNoti.scss';
import NotificationSelectionModal from "../NotiSelection/notiSelection";
import propTypes from 'prop-types';

const SendNoti = ({dataUser}) => {
    
    const textAreaRef = useRef(null);
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [files, setFiles] = useState([]);

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

    // Handle file selection
    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            
            // Map files to include size in MB and determine file type
            const newFiles = selectedFiles.map(file => {
                const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
                return {
                    name: file.name,
                    size: `${fileSizeInMB} MB`,
                    type: file.type,
                    extension: file.name.split('.').pop().toLowerCase(),
                    file: file
                };
            });
            
            setFiles(prevFiles => [...prevFiles, ...newFiles]);
        }
    };

    // Function to remove a file
    const handleRemoveFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };
    
    // Function to trigger file input click
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    
    // Function to determine which icon to display based on file type
    const getFileIcon = (fileData) => {
        if (!fileData || !fileData.extension) {
            return <DOCX />;
        }
        
        const extension = fileData.extension.toLowerCase();
        
        switch (extension) {
            case 'csv':
                return <CSV />;
            case 'pdf':
                return <PDF />;
            case 'doc':
            case 'docx':
                return <DOCX />;
            case 'jpg':
            case 'jpeg':
                return <JPG />;
            case 'png':
                return <PNG />;
            case 'zip':
            case 'rar':
                return <RAR />;
            case 'txt':
                return <TXT />;
            case 'ppt':
            case 'pptx':
                return <PPT />;
            case 'xls':
            case 'xlsx':
                return <XLS />;
            default:
                return <DOCX />;
        }
    };

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
                    
                    {/* Display uploaded files */}
                    {files.length > 0 ? (
                        files.map((fileData, index) => (
                            <div className="col-3 mt-2 ms-2" key={index}>
                                <div className="attach-file d-flex row">
                                    <div className="attach-file-icon col-3" style={{padding: '0px'}}>
                                        {getFileIcon(fileData)}
                                    </div>
                                    <div className="col-8" style={{padding: '0px'}}>
                                        <p className="attach-file-title">
                                            {fileData.name && fileData.name.length > 19 
                                                ? `${fileData.name.substring(0, 19)}...` 
                                                : fileData.name} </p>
                                        <p className="attach-file-capacity">{fileData.size}</p>
                                    </div>
                                    <div className="col-1" style={{padding: '0px'}}>
                                        <button 
                                            className="btn btn-sm text-danger" 
                                            onClick={() => handleRemoveFile(index)}
                                            style={{background: 'none', border: 'none'}}
                                        >
                                            <i className="fa-solid fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Example static file (can be removed once upload functionality is working)
                        <div className="col-3 mt-2">
                            <i>&lt; &lt; Không có file nào được chọn &gt; &gt;</i>
                        </div>
                    )}
                    
                    {/* Upload button */}
                    <div className="col-1 mt-2 ms-2  d-flex" style={{padding: '0px'}}>
                        <button 
                            className="add-button" 
                            style={{height: '50px', width: '50px'}}
                            onClick={handleUploadClick}
                        >
                            <p>
                                <i className="fa-solid fa-plus"></i>
                            </p>
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                            multiple
                            accept=".csv,.pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.rar,.txt,.ppt,.pptx,.xls,.xlsx"
                        />
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