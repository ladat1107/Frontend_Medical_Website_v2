import React, { useState } from 'react';
import { Dropdown, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { primaryColorAdmin } from '@/styles/variables';
const DropdownSelectMessage = (props) => {
    //const [selectedLabel, setSelectedLabel] = useState(props?.page || 10);
    let handleChange = (value) => {
        props.setPage(value);  // Trả về key
        setSelectedLabel(value); // Cập nhật label
    };
    let items = [
        {
            label: "Nhắn tin với nhân viên y tế",
            key: '1',
            onClick: () => { handleChange(1) }
        },
        {
            label: "Nhắn tin với Hoa Sen Mini",
            key: '2',
            onClick: () => { handleChange(2) }
        },
    ]

    return (
        <Dropdown
            menu={{
                items,
            }}
            trigger={['hover']}
            overlayClassName="dropdownPage"
            placement="bottomCenter">
            <Space>
                <FontAwesomeIcon icon={faUserAstronaut} beat color={primaryColorAdmin} style={{ cursor: "pointer", }} />
            </Space>
        </Dropdown>
    );
};

export default DropdownSelectMessage;