import React, { useEffect, useState } from 'react';
import { Dropdown, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { primaryColorAdmin, secondaryColorAdmin } from '@/styles/variables';
const DropdownSelectMessage = ({ typeMessage, setTypeMessage }) => {
  
    useEffect(() => {
        setTypeMessage(typeMessage);
    }, [typeMessage])
    let items = [
        {
            label: (<div style={{ color: secondaryColorAdmin }}>Nhắn tin với nhân viên y tế</div>),
            key: '1',
            onClick: () => { setTypeMessage(1) },
            hidden: typeMessage === 1,
        },
        {
            label: (<div style={{ color: secondaryColorAdmin }}>Hoa Sen Mini</div>),
            key: '2',
            onClick: () => { setTypeMessage(2) },
            hidden: typeMessage === 2,
        },
    ]

    return (
        <Dropdown
            menu={{ items }}
            trigger={['hover']}
            overlayClassName="dropdownPage"
            placement="bottomLeft">
            <Space>
                <FontAwesomeIcon icon={faUserAstronaut} beat color={primaryColorAdmin} style={{ cursor: "pointer", }} />
            </Space>
        </Dropdown>
    );
};

export default DropdownSelectMessage;