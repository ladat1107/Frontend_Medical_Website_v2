import React, { useEffect, useRef, useState } from "react";
import "./doctorList.scss";
import DoctorCard from "./Component";
import { formatCurrency } from "@/utils/formatCurrency";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
import PaginationUser from "@/components/Pagination/Pagination";
import userService from "@/services/userService";
import { useMutation } from "@/hooks/useMutation";
import useDebounce from "@/hooks/useDebounce";
import DoctorCardSkeleton from "./Component/DoctorCardSkeleton";
import useQuery from "@/hooks/useQuery";
import { Input, Select } from "antd";
import { SearchOutlined } from "@mui/icons-material";

const DoctorInfo = () => {
  let [pageSize, setPageSize] = useState({ currentPage: 1, pageSize: 12 });
  let [total, setTotal] = useState(0);
  let [doctorList, setDoctorList] = useState([]);
  let [search, setSearch] = useState('');
  let searchDebounce = useDebounce(search || "", 500);
  let [departmentId, setDepartmentId] = useState(null);
  let [specialtyId, setSpecialtyId] = useState(null);
  const location = useLocation();

  // Parse các giá trị từ query string
  const params = new URLSearchParams(location.search);
  const departmentIdUrl = params.get("departmentId");  // Lấy giá trị của query param "id"
  const specialtyIdUrl = params.get("specialtyId");
  const searchRef = useRef(null);
  const {
    data: doctorData,
    loading: doctorLoading,
    execute: getDoctor,
  } = useMutation(() => userService.getDoctor({ limit: pageSize.pageSize, page: pageSize.currentPage, search: searchDebounce, departmentId: departmentId, specialtyId: specialtyId }));
  const { data: listDepartment, loading: departmentLoading } = useQuery(() => userService.getDepartment());
  const { data: listSpecialty, loading: specialtyLoading } = useQuery(() => userService.getSpecialty());
  useEffect(() => {
    if (departmentIdUrl) {
      setDepartmentId(departmentIdUrl);
    }
    if (specialtyIdUrl) { setSpecialtyId(specialtyIdUrl); }
  }, [departmentIdUrl, specialtyIdUrl]);

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    getDoctor();
  }, [searchDebounce, pageSize.currentPage, pageSize.pageSize, departmentId, specialtyId]);
  useEffect(() => {
    if (doctorData?.EC === 0) {
      setDoctorList(doctorData?.DT?.rows || []);
      setTotal(doctorData?.DT?.count || 0);
    }
  }, [doctorData]);

  const navigate = useNavigate();
  return (
    <div className="doctor-info">
      <div className="head-section">
        {!departmentLoading && !specialtyLoading &&
          <div className="d-flex row w-100 filter">
            <Input
              className="col-4 input-search"
              onChange={(e) => { setSearch(e.target.value), setPageSize({ ...pageSize, currentPage: 1 }) }}
              value={search}
              inputRef={searchRef}
              placeholder="Tìm kiếm bác sĩ" prefix={<SearchOutlined />} />
            <div className="col-4 px-2">
              <div className="custom-select-container">
                <Select
                  className="custom-select"
                  value={listDepartment?.DT?.find((item) => +item.id === +departmentId)?.name || undefined}
                  onChange={(value) => setDepartmentId(value)}
                  placeholder="Khoa"
                  showSearch
                  allowClear
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={listDepartment?.DT?.map((item) => ({ value: item.id, label: item.name, }))}
                />
              </div>
            </div>

            <div className="custom-select-container col-4">
              <Select
                className="custom-select"
                value={listSpecialty?.DT?.find((item) => +item.id === +specialtyId)?.name || undefined}
                onChange={(value) => setSpecialtyId(value)}
                placeholder="Chuyên khoa"
                showSearch
                allowClear
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={listSpecialty?.DT?.map((item) => ({ value: item.id, label: item.name, }))}
              />
            </div>
          </div>}


      </div>
      <div className="list-item row">
        {doctorLoading ?
          Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <DoctorCardSkeleton />
            </div>))
          :
          doctorList?.length > 0 ? doctorList.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
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