import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./departmentList.module.scss";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
import DepartmentCard from "@/components/DepartmentCard";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";

const DepartmentInfo = (props) => {
  let [departmentList, setListDepartment] = useState(props?.departmentList);
  let [search, setSearch] = useState("");
  let navigate = useNavigate();
  let handleChangrSearch = (e) => {
    let _listDepartment = [...props?.departmentList];
    setSearch(e.target.value);
    if (e.target.value === "") {
      setListDepartment(_listDepartment);
      return;
    }
    let list = _listDepartment.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setListDepartment(list);
  }
  return (
    <div className={cx("department-info")}>
      <div className={cx("head-section")}>
        <div className="container-input">
          <input
            type="text"
            placeholder="Tìm kiếm khoa"
            name="text"
            className="input"
            value={search}
            onChange={(e) => handleChangrSearch(e)}
          />
          <svg
            fill="#000000"
            width="20px"
            height="20px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <div className={cx("btn-action")}>
          <div className={cx("action-left")}>Tư Vấn Ngay</div>
          <div className={cx("action-right")} onClick={() => { navigate(PATHS.HOME.BOOKING) }}>Đặt lịch hẹn</div>
        </div>
      </div>
      <div className={cx('list-item')} >
        {departmentList?.length > 0 && departmentList.map((item, index) => (
          <div
            className="col-3 px-2 mb-2"
            key={index}>
            <DepartmentCard
              id={item?.id}
              image={item?.image}
              name={item?.name}
              shortDescription={item?.shortDescription}
            />
          </div>
        ))}
      </div>
    </div >
  );
};

export default DepartmentInfo;
