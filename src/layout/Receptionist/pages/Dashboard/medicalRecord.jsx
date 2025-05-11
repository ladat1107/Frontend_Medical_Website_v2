import { useMutation } from "@/hooks/useMutation";
import { getExaminations } from "@/services/doctorService";
import { message, Pagination, Select, Spin } from "antd";
import { useState } from "react";
import PatientItem from "../../components/PatientItem/PatientItem";


const MedicalRecord = () => {
    const [pageSize, setPageSize] = useState(50);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(4);
    const [medicalTreatmentTier, setMedicalTreatmentTier] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [listExam, setListExam] = useState([]);

    const handelSelectChange = (value) => {
        setStatus(value);
    }

    const handelTreatmentTierChange = (value) => {
        setMedicalTreatmentTier(+value);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const {
        data: dataExaminations,
        loading: loadingExaminations,
        execute: fetchExaminations,
    } = useMutation(() => getExaminations('', '', status, '', '', currentPage, pageSize, search, ''));


    return (
        <>
            <div className="appointment-content">
                <div className="search-container row">
                    <div className="col-2">
                        <p className="search-title">Đối tượng thanh toán</p>
                        <Select className="select-box" defaultValue="2" onChange={handelTreatmentTierChange}>
                            <Select.Option value="2">Ngoại trú</Select.Option>
                            <Select.Option value="1">Nội trú</Select.Option>
                        </Select>
                    </div>
                    <div className="col-2">
                        <p className="search-title">Trạng thái</p>
                        <Select className="select-box" defaultValue="4" onChange={handelSelectChange}>
                            <Select.Option value="6">Đang điều trị</Select.Option>
                            <Select.Option value="7">Đã xuất viện</Select.Option>
                        </Select>
                    </div>
                    <div className="col-6">
                        <p className="search-title">Tìm kiếm đơn khám</p>
                        <input type="text" className="search-box"
                            placeholder="Nhập tên bệnh nhân để tìm kiếm..."
                            value={search}
                            onChange={handleSearch} />
                    </div>
                </div>
                <div className="appointment-container mt-3 row">
                    <div className="header">
                        <p className="title">Danh sách đơn khám</p>
                    </div>
                    <div className="schedule-content text-center">
                            {loadingExaminations ? (
                                <div className="loading">
                                    <Spin />
                                </div>
                            ) : (listExam && listExam.length > 0 ? listExam.map((item, index) => (
                                <div key={index}>
                                    <PatientItem
                                        key={item.data.id + index}
                                        index={index + 1}
                                        id={item.data.id}
                                        name={`${item.data?.userExaminationData.lastName} ${item.data?.userExaminationData.firstName}`}
                                        symptom={item.type}
                                        special={item.data.special}
                                        room={item.data.roomName}
                                        doctor={`${item.data?.examinationStaffData?.staffUserData.lastName} ${item.data?.examinationStaffData?.staffUserData.firstName}`}
                                        visit_status={item.data.visit_status}
                                        onClickItem={() => handlePay(index)}
                                        sort={false}
                                    />
                                </div>
                            )) : (
                                <div className="no-patient d-flex justify-content-center mt-2">
                                    <p>Không tìm thấy bệnh nhân!</p>
                                </div>
                            )
                        )}       
                    </div>
                    <div className='row mt-3'>
                        <Pagination
                            align="center"
                            current={currentPage}
                            pageSize={pageSize}
                            total={total}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MedicalRecord;