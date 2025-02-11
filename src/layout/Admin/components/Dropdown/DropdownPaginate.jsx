import React, { useState } from 'react';
import { Dropdown, Menu, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
const DropdownPaginate = (props) => {
    const [selectedLabel, setSelectedLabel] = useState(props?.page?.value || 10);
    let handleChange = (item) => {
        props.setPage(item);  // Trả về key
        setSelectedLabel(item.value); // Cập nhật label
    };
    let items = [
        {
            label: "10",
            key: '1',
            onClick: () => { handleChange({ id: 1, value: 10 }) }
        },
        {
            label: "25",
            key: '2',
            onClick: () => { handleChange({ id: 2, value: 25 }) }
        },
        {
            label: "50",
            key: '3',
            onClick: () => { handleChange({ id: 3, value: 50 }) }
        },
        {
            label: "100",
            key: '4',
            onClick: () => { handleChange({ id: 4, value: 100 }) }
        }
    ]

    return (
        <div className='me-3'>
            Hiển thị <span className='ms-2'><b> {selectedLabel}</b></span>
            <Dropdown
                menu={{
                    items,
                }}
                trigger={['click']}
                overlayClassName="dropdownPage"
                placement="bottomRight">
                <Space>
                    <FontAwesomeIcon className='ms-1' icon={faChevronDown} size='xs' />
                </Space>
            </Dropdown>
        </div >
    );
};

export default DropdownPaginate;