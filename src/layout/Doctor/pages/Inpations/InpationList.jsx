
import { getListInpations } from "@/services/doctorService";
import { DatePicker, Pagination, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useMutation } from "@/hooks/useMutation";
import PatientItem from "@/layout/Receptionist/components/PatientItem/PatientItem";

const InpationList = () => {
    const [status, setStatus] = useState(5);
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [listInpation, setListInpation] = useState([]);

    // #region Fetch data 
    const {
        data: dataInpations,
        loading: loadingInpations,
        error: errorInpations,
        execute: fetchInpations,
    } = useMutation(() => getListInpations(currentDate, toDate, +status, currentPage, pageSize, search))

    useEffect(() => {
        fetchInpations();
    }, [status, search, currentPage, pageSize, currentDate, toDate]);

    useEffect(() => {
        if (dataInpations) {
            setTotal(dataInpations.DT.totalItems);
            setListInpation(dataInpations.DT.examinations);
            console.log(dataInpations);
        }
    }, [dataInpations]);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const downItem = () => {
        fetchInpations();
    }

    return (
        <>
            <div className="inpations-content">
                <div className="search-container row">
                    <div className="col-2">
                        <p className="search-title">Trạng thái</p>
                        <Select className="select-box" defaultValue="5" onChange={(value) => setStatus(+value)}>
                            <Select.Option value="5">Chưa khám hôm nay</Select.Option>
                            <Select.Option value="6">Đã khám hôm nay</Select.Option>
                            <Select.Option value="7">Đã xong</Select.Option> 
                        </Select>
                    </div>
                    {status == 7 && (
                        <>
                            <div className="col-2">
                                <p className="search-title">Từ ngày</p>
                                <DatePicker className="date-picker" 
                                    value={currentDate} allowClear={false}  
                                    onChange={(date) => setCurrentDate(date)}/>
                            </div>
                            <div className="col-2" >
                                <p className="search-title">Đến ngày</p>
                                <DatePicker className="date-picker" 
                                    value={toDate} allowClear={false}  
                                    onChange={(toDate) => setToDate(toDate)}/>
                            </div>
                        </>
                    )}
                    <div className="col-6">
                        <p className="search-title">Tìm kiếm đơn khám</p>
                        <input type="text" className="search-box" 
                            placeholder="Nhập tên bệnh nhân để tìm kiếm..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                </div>
                <div className="appointment-container mt-3 row">
                    <div className="header">
                        <p className="title">Danh sách đơn khám</p>
                    </div>
                    <div className="schedule-content text-center">
                        {loadingInpations ? (
                            <div className="loading">
                                <Spin />
                            </div>
                        ) : ( listInpation && listInpation.length > 0 ? listInpation.map((item, index) => (
                                <PatientItem
                                    key={item.id}
                                    index={index + 1}
                                    id={item.id}
                                    name={`${item.userExaminationData.lastName} ${item.userExaminationData.firstName}`}
                                    symptom={'Triệu chứng: ' + item.symptom}
                                    special={item.special}
                                    room={item.roomName}
                                    visit_status={item.visit_status}
                                    onClickItem={()=>handleClickRow(item.id)}
                                    sort={false}
                                />
                            )):(
                                <div className="no-patient d-flex justify-content-center mt-2">
                                    <p>Không tìm thấy bệnh nhân!</p>
                                </div>
                            )
                        )}
                    </div>
                    <div className='row mt-4'>
                        {!loadingInpations && listInpation.length > 0 && (
                            <Pagination
                                align="center"
                                current={currentPage}
                                pageSize={pageSize}
                                total={total}
                                onChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default InpationList;