import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';

const NotiItem = ({ noti }) => {
    const [isContentVisible, setIsContentVisible] = useState(false);
    const contentRef = useRef(null);
    const previewRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [previewHeight, setPreviewHeight] = useState(0);
    const [isPreviewVisible, setIsPreviewVisible] = useState(true);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight + 15);
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
        } else {
            setIsContentVisible(false);
            setTimeout(() => {
                setIsPreviewVisible(true);
            }, 300);
        }
    };
    
    return (
        <div className="noti-item">
            <div 
                className="noti-item-header row" 
                onClick={toggleContent}
                style={{ cursor: 'pointer' }}
            >
                <div className="row col-9">
                    <div className='d-flex'>
                        <p className="noti-item-title me-2">
                            {noti.title || 'Title'}
                        </p>
                        <p className='noti-item-time'>
                            {noti.time || '10 phút trước'}
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
                            opacity: isPreviewVisible ? 1 : 0,
                            transform: isPreviewVisible ? 'translateY(0)' : 'translateY(-10px)',
                            transitionProperty: 'height, opacity, transform',
                            transitionDuration: '0.3s',
                            transitionTimingFunction: 'ease-in-out'
                        }}
                    >
                        {noti.content && noti.content.length > 100 
                            ? `${noti.content.substring(0, 110)}...` 
                            : noti.content}
                    </div>
                </div>
                <div className="d-flex row col-3">
                    <p className="noti-item-title">
                        Người gửi
                    </p>
                    <p className='noti-item-time mt-1'>
                        {noti.doctor || 'Bác sĩ: Nguyễn Văn A'}
                    </p>
                </div>
            </div>
            
            <div 
                className={`noti-item-content-container ${isContentVisible ? 'mt-2 mb-2' : ''}`}
                style={{
                    height: isContentVisible ? `${contentHeight}px` : '0px',
                    overflow: 'hidden',
                    transition: 'height 0.3s ease-in-out',
                    opacity: isContentVisible ? 1 : 0,
                    transform: isContentVisible ? 'translateY(0)' : 'translateY(10px)',
                    transitionProperty: 'height, opacity, transform',
                    transitionDuration: '0.3s',
                    transitionTimingFunction: 'ease-in-out'
                }}
            >
                <div ref={contentRef} className="noti-item-content row mt-2 px-3">
                    <div className="col-12">
                        {noti.content || 'Content'}
                    </div>
                </div>
            </div>
        </div>
    )
};

NotiItem.propTypes = {
    noti: PropTypes.object.isRequired,
};

export default NotiItem;