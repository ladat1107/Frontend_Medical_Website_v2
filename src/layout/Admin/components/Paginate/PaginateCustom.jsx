import React from 'react';
import Paginate from "react-paginate-in-peace";
import './PaginateCustom.scss'
const PaginateCustom = (props) => {
    return (
        <Paginate className="paginate"
            defaultPage={props.setPage} // Optional Property
            totalPageCount={props.totalPageCount} // Required Property
            setPage={props.setPage} // Required Property
            activeDigitColor={"white"} // Optional Property
            activeBackgroundColor={"#04a9f3"} // Optional Property
            buttonBorderColor={"#04a9f3"} // Optional Property
            arrowColor={"#04a9f3"} // Optional Property
            dotColor={"#04a9f3"} // Optional Property
        />
    );
};

export default PaginateCustom;