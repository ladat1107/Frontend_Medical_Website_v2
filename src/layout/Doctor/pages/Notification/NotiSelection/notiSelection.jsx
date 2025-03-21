import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './NotiSelection.scss';
import SelectionItem from './selectionItem';
import SelectBox2 from '@/layout/Doctor/components/Selectbox';

const NotificationSelectionModal = ({ isOpen, onClose, onSubmit, data, checkedUsers }) => {
    const [role, setRole] = useState(0);
    const [selectedUsers, setSelectedUsers] = useState([]);
    // Tạo ref để tham chiếu đến phương thức trong component con
    const selectionItemRef = useRef(null);

    const roles = [
        { value: 0, label: 'Toàn bộ hệ thống' },
        { value: 1, label: 'Người dùng' }, 
        { value: 2, label: 'Nhân viên' }, 
        { value: 3, label: 'Chỉ trưởng phòng' }, 
        { value: 4, label: 'Khác' }
    ];

    const handleRoleChange = (value) => {
        setRole(value);
    }

    const handleCheckedUsersChange = (checkedUsers) => {
        setSelectedUsers(checkedUsers);
    };
    
    const handleSubmit = () => {
        onSubmit(selectedUsers);
    };

    const handleUnCheckAll = () => {
        // Xử lý bỏ chọn tất cả bằng cách set mảng rỗng
        setSelectedUsers([]);
        
        // Thực hiện bỏ chọn trong component con thông qua ref
        if (selectionItemRef.current && selectionItemRef.current.resetAllChecks) {
            selectionItemRef.current.resetAllChecks();
        }
        
        // Chuyển role về 4 (Khác) để giữ nguyên selection rỗng
        setRole(4);
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Khởi tạo selectedUsers khi có checkedUsers và modal mở
    useEffect(() => {
        if (isOpen && checkedUsers && checkedUsers.length > 0) {
            setSelectedUsers(checkedUsers);
        }
    }, [isOpen, checkedUsers]);

    if (!isOpen || !data) return null;

    return (
        <div className="noti-selection-container">
            <div className="noti-selection-content">
                <div className='noti-selection-header'>
                    Danh sách người nhận
                </div>
                <div className='noti-selection-action'>
                    <div className='d-flex align-items-center'>
                        <p className='me-3'>Chọn đối tượng: </p>
                        <div>
                            <SelectBox2
                                className="select-box2"
                                options={roles}
                                value={role}
                                placeholder="Chọn người nhận"
                                onChange={handleRoleChange}
                                disabled={false}
                            />
                            <button 
                                className="close-exam-btn ms-3" 
                                onClick={handleUnCheckAll}
                                disabled={selectedUsers.length === 0}
                                title={selectedUsers.length === 0 ? "Chưa có người dùng nào được chọn" : "Bỏ chọn tất cả người dùng"}
                            >
                                Bỏ chọn
                            </button>
                        </div>
                    </div>
                </div>
                <div className='noti-selection-body'>
                    <SelectionItem 
                        ref={selectionItemRef}
                        dataUser={data} 
                        role={role} 
                        onCheckedUsersChange={handleCheckedUsersChange}
                        checkedUsers={selectedUsers}
                        key={role + '-' + selectedUsers.length} // Thêm key để force re-render
                    />
                </div>
                <div className='noti-selection-footer'>
                    <button className="close-exam-btn me-3" onClick={onClose}>Đóng</button>
                    <button 
                        className="noti-selection-btn" 
                        onClick={handleSubmit}
                        disabled={selectedUsers.length === 0}
                    >
                        Xác nhận ({selectedUsers.length})
                    </button>
                </div>
            </div>
        </div>
    );
};

NotificationSelectionModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    checkedUsers: PropTypes.array
}

export default NotificationSelectionModal;