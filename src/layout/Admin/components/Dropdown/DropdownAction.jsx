import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import DeleteModal from '../Modal/DeleteModal';
import './Dropdown.scss'
import { Dropdown, Space } from 'antd';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
const DropdownAction = (props) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    let handleDelete = () => {
        setShowDeleteModal(true)
    }
    let handleShow = (value) => {
        setShowDeleteModal(value)
    }
    let handleUpdate = () => {
        props.action(props.data)
    }
    let items = [
        {
            label: (<span className="update" > <FontAwesomeIcon className="me-1" icon={faFilePen} size="lg" /> Cập nhật</span>),
            key: 'update-action',
            onClick: () => { handleUpdate() }
        },
        {
            label: (<span className="del"> <FontAwesomeIcon className="me-2" icon={faTrashCan} size="lg" /> Xóa</span>),
            key: 'delete-action',
            onClick: () => { handleDelete() }
        },]
    return (
        <div>
            <Dropdown
                menu={{
                    items,
                }}
                trigger={['click']}
                overlayClassName="dropdownAction"
                placement="bottomRight">
                <Space>
                    <FontAwesomeIcon icon={faEllipsisVertical} size='xl' />
                </Space>
            </Dropdown>
            <DeleteModal
                show={showDeleteModal}
                isShow={handleShow}
                {...props} />
        </div>
    );
};
<style>

</style>

export default DropdownAction;