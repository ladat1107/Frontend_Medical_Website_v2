
import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constant/path';
import { useSelector } from 'react-redux';
const DropdownHandbook = (props) => {
    let navigate = useNavigate();
    let { user } = useSelector((state) => state.authen);
    let handleClick = () => {
        if (user.staff) {
            navigate(PATHS.STAFF.HANDBOOK + `/${props.id}`)
        } else {
            navigate(PATHS.ADMIN.HANDBOOK_DETAIL + "/" + props.id)
        }
    }
    const items = [
        {
            label: "Xem chi tiết",
            key: '0',
            onClick: () => { handleClick() }
        },
        ...(user?.staff ? [{
            label: "Chỉnh sửa",
            key: '1',
            onClick: () => { props.handleUpdate(props.id) }
        }] : []),
    ];
    return (
        <Dropdown
            menu={{
                items,
            }}
            //  trigger={['click']}
            overlayClassName="dropdown-handbook"
            placement="bottom">
            <Button style={{ background: "none", border: "none", }}>
                <Space>
                    <FontAwesomeIcon size="xl" icon={faEllipsisVertical} />
                </Space>
            </Button>


        </Dropdown>
    )
}

export default DropdownHandbook