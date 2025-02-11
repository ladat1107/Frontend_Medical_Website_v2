import React from 'react';
import "./Loading.scss"
import { Spin } from 'antd';
const Loading = () => {
    return (
        <div className='loading-spin'>
            <Spin tip="Loading..." />
        </div>

    );
};

export default Loading;