import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./doctorList.module.scss";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
import DoctorCard from "./Component";
import { formatCurrency } from "@/utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
import PaginationUser from "@/components/Pagination/Pagination";
import userService from "@/services/userService";
import { useMutation } from "@/hooks/useMutation";
import useDebounce from "@/hooks/useDebounce";
import DoctorCardSkeleton from "./Component/DoctorCardSkeleton";

const DoctorInfo = () => {
  let [pageSize, setPageSize] = useState({ currentPage: 1, pageSize: 12 });
  let [total, setTotal] = useState(0);
  let [doctorList, setDoctorList] = useState([]);
  let [search, setSearch] = useState('');
  let searchDebounce = useDebounce(search || "", 500);
  const searchRef = useRef(null);
  const {
    data: doctorData,
    loading: doctorLoading,
    execute: getDoctor,
  } = useMutation(() => userService.getDoctor({ limit: pageSize.pageSize, page: pageSize.currentPage, search: searchDebounce }));
  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    getDoctor();
  }, [searchDebounce, pageSize.currentPage, pageSize.pageSize]);
  useEffect(() => {
    if (doctorData?.EC === 0) {
      setDoctorList(doctorData?.DT?.rows || []);
      setTotal(doctorData?.DT?.count || 0);
    }
  }, [doctorData]);

  const navigate = useNavigate();
  return (
    <div className={cx("doctor-info")}>
      <div className={cx("head-section")}>
        <div className="container-input">
          <input
            onChange={(e) => { setSearch(e.target.value), setPageSize({ ...pageSize, currentPage: 1 }) }}
            // value={search}
            type="text"
            ref={searchRef}
            placeholder="Tìm kiếm bác sĩ"
            name="text"
            className="input"
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
          <div className={cx("action-right")} onClick={() => navigate(PATHS.HOME.BOOKING)}>Đặt lịch hẹn</div>
        </div>
      </div>
      <div className={cx('list-item')} >
        {doctorLoading ?
          Array.from({ length: 12 }).map((_, index) => (
            <div key={index}>
              <DoctorCardSkeleton />
            </div>))
          :
          doctorList?.length > 0 ? doctorList.map((item, index) => (
            <div key={index}>
              <DoctorCard
                id={item?.staffUserData?.id}
                avatar={item?.staffUserData?.avatar}
                name={(item?.staffUserData?.lastName.length + item?.staffUserData?.firstName.length) < 15 ? item?.staffUserData?.lastName + " " + item?.staffUserData?.firstName : item?.staffUserData?.firstName}
                specialty={item?.staffDepartmentData?.name}
                price={formatCurrency(item?.price || 0)}
                visits={item?.examinationStaffData?.length || 0}
                rating="4.8" />
            </div>
          )) : <div>Không tìm thấy bác sĩ</div>}
      </div>
      <div>
        <PaginationUser
          currentPage={pageSize.currentPage}
          pageSize={pageSize.pageSize}
          total={total}
          handlePageChange={(page, size) => setPageSize({ currentPage: page, pageSize: size })}
        />
      </div>
    </div>

  );
};

export default DoctorInfo;
