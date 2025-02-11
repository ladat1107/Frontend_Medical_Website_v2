import React, { useState } from 'react';
import { Pagination, List, Select } from 'antd';

const PaginationUser = (props) => {
    const handlePageSizeChange = (value) => {
        props.handlePageChange(1, parseInt(value)); // Reset về trang 1 khi thay đổi số lượng mỗi trang
    };
    let opt = [{ value: 12, label: "12 / trang" }, { value: 24, label: "24 / trang" }, { value: 36, label: "36 / trang" }]
    return (
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'end', alignItems: 'center', userSelect: 'none', width: '100%' }}>
            <Select
                defaultValue={props?.pageSize || '12'}
                onChange={handlePageSizeChange}
                options={opt}
            />
            <Pagination
                current={props.currentPage}
                pageSize={props?.pageSize || 12}
                total={props?.total || 0}
                onChange={(page) => props.handlePageChange(page, props.pageSize)}
                showSizeChanger={false} // Ẩn showSizeChanger của Ant Design
            />
        </div>
    );
};

export default PaginationUser;
