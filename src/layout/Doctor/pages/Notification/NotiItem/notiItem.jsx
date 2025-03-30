import ParseHtml from '@/components/ParseHtml';
import { timeAgo } from '@/utils/formatDate';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import AttachedFile from './attachedFile';
import { updateNotification } from '@/services/doctorService';
import './NotiItem.scss'

const NotiItem = ({ noti }) => {
    const [isContentVisible, setIsContentVisible] = useState(false);
    const contentRef = useRef(null);
    const previewRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [previewHeight, setPreviewHeight] = useState(0);
    const [isPreviewVisible, setIsPreviewVisible] = useState(true);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight + 10);
        }
        if (previewRef.current) {
            setPreviewHeight(previewRef.current.scrollHeight);
        }
    }, [noti.content]);

    const toggleContent = () => {
        if (!isContentVisible) {
            setIsPreviewVisible(false);
            setTimeout(() => {
                setIsContentVisible(true);
            }, 300);
            
            if (noti.status === 1) {
                let data = {
                    id: noti.id,
                    receiverId: noti.receiverId,
                    title: noti.title,
                    htmlDescription: noti.htmlDescription,
                    status: 2
                }
                updateNotification(data)
                noti.status = 2;
            }

        } else {
            setIsContentVisible(false);
            setTimeout(() => {
                setIsPreviewVisible(true);
            }, 300);
        }
    };
    
    return (
        <div className="noti-item"
            style={{background: `${noti.status === 2 ? 'white' : '#f6fcff'}`}}>
            <div 
                className="noti-item-header row" 
                onClick={toggleContent}
                style={{ cursor: 'pointer' }}
            >
                <div className="row col-9">
                    <div className='d-flex'>
                        <p className={`noti-item-title me-2`}>
                            {noti.title || 'Title'}
                        </p>
                        <p className='noti-item-time' style={{ opacity: '0.8' }}>
                            {timeAgo(noti.date) || ''}
                        </p>
                        <span style={{ marginLeft: '5px', transition: 'transform 0.3s' }}>
                            {isContentVisible ? <i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i>}
                        </span>
                    </div>
                    <div 
                        ref={previewRef}
                        className="noti-item-preview col-12 mt-1"
                        style={{
                            height: isPreviewVisible ? `${previewHeight}px` : '0px',
                            overflow: 'hidden',
                            transition: 'height 0.2 ease-in-out',
                            transform: isPreviewVisible ? 'translateY(0)' : 'translateY(-10px)',
                            transitionProperty: 'height, opacity, transform',
                            transitionDuration: '0.3s',
                            transitionTimingFunction: 'ease-in-out'
                        }}
                    >
                        {noti.htmlDescription && noti.htmlDescription.length > 100 
                            ? <ParseHtml htmlString={`${noti?.htmlDescription.substring(0, 100)}...`|| 'Content'} />  
                            : <ParseHtml htmlString={noti?.htmlDescription || 'Content'} />}
                    </div>
                </div>
                <div className="d-flex row col-3">
                    <p className="noti-item-title">
                        Người gửi
                    </p>
                    <p className='noti-item-time mt-1'>
                        {noti.NotificationSenderData.lastName + ' '
                            + noti.NotificationSenderData.firstName
                            || 'Bác sĩ: Nguyễn Văn A'}
                    </p>
                </div>
            </div>
            
            <div 
                className={`noti-item-content-container}`}
                style={{
                    height: isContentVisible ? `${contentHeight}px` : '0px',
                    overflow: 'hidden',
                    transition: 'height 0.3s ease-in-out',
                    opacity: isContentVisible ? 1 : 0,
                    transform: isContentVisible ? 'translateY(0)' : 'translateY(10px)',
                    transitionProperty: 'height, opacity, transform',
                    transitionDuration: '0.3s',
                    transitionTimingFunction: 'ease-in-out',
                }}
            >
                <div ref={contentRef} className="noti-item-content row px-1">
                    <div className="col-12" >
                        <ParseHtml htmlString={noti?.htmlDescription || 'Content'} />
                    </div>
                    {noti?.NotificationAttachFileData?.length > 0 && (
                        <div className="noti-item-attach-file">
                            {noti.NotificationAttachFileData.map((file, index) => (
                                <AttachedFile key={index} link={file.link} type={file.type} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

NotiItem.propTypes = {
    noti: PropTypes.object.isRequired,
};

export default NotiItem;