import { DatePicker, Input } from "antd";
import "../Booking.scss";
import { SearchOutlined } from "@mui/icons-material";
import userService from "@/services/userService";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { formatCurrency } from "@/utils/formatCurrency";
import { faLeftLong, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@/hooks/useMutation";
import Loading from "@/components/Loading/Loading";
import dayjs from "dayjs";
import "dayjs/locale/vi";

const BookingDoctor = (props) => {
    let [specialtyId, setSpecialtyId] = useState(props.specialtyId);
    let [date, setDate] = useState(null);
    let [listDoctor, setListDoctor] = useState([]);
    let [listDoctorFilter, setListDoctorFilter] = useState([]);
    let [search, setSearch] = useState('');
    let searchDebounce = useDebounce(search || "", 500);
    const {
        data: dataDoctor,
        loading: loadingDoctor,
        execute: fetchDoctor,
    } = useMutation(() => userService.getDoctor({ specialtyId: specialtyId, search: searchDebounce, date: '1' }));
    useEffect(() => {
        if (dataDoctor) { setListDoctor(dataDoctor?.DT || []); }
    }, [dataDoctor]);
    useEffect(() => {
        fetchDoctor();
    }, [searchDebounce, specialtyId]);

    useEffect(() => {
        if (listDoctor?.length > 0) {
            if (date) {
                const selectedDate = dayjs(date).format("YYYY-MM-DD");
                const _listDoctor = listDoctor.filter((doctor) => {
                    return doctor?.staffScheduleData?.some(item =>
                        dayjs(item.date).isSame(selectedDate, 'day')
                    );
                });
                setListDoctorFilter(_listDoctor);
            } else {
                setListDoctorFilter(listDoctor);
            }
        }
    }, [date, listDoctor]);

    let handleChangeSearch = (event) => {
        setSearch(event.target.value);
    }

    return (
        <>
            <div className="header">
                <FontAwesomeIcon className="icon-back" icon={faLeftLong} onClick={() => { props.back() }} />
                Vui lòng chọn bác sĩ
            </div>
            <div className="content">
                <div>
                    <Input
                        onChange={(e) => handleChangeSearch(e)}
                        style={{ height: '40px', borderRadius: '5px', }}
                        placeholder="Tìm nhanh bác sĩ"
                        suffix={<SearchOutlined />}
                    /></div>
                <div className="mt-2">
                    <DatePicker
                        className="date-picker"
                        onChange={(date) => setDate(date)}
                        allowClear={true}
                        placeholder="Chọn ngày khám"
                        format={'DD/MM/YYYY'} style={{ width: "30%" }}
                        disabledDate={(current) => current && current.valueOf() <= dayjs().endOf("day").valueOf()}
                    />
                </div>

                {loadingDoctor ? <div className="doctor-list mt-3"><Loading /></div> :
                    <div className="doctor-list mt-3">
                        {listDoctorFilter?.length > 0 ? listDoctorFilter.map((doctor, index) => (
                            <div className={"item"} key={index} onClick={() => props.next(doctor)}>
                                <div className={"name"}><FontAwesomeIcon className="me-3" icon={faUserDoctor} />{doctor?.staffUserData?.lastName + " " + doctor?.staffUserData?.firstName}</div>
                                <p className={"gender"}>
                                    <span>Giới tính:</span> {doctor?.staffUserData?.gender === 1 ? "Nữ" : "Nam"}
                                </p>
                                <p className={"specialty"}>
                                    <span>Chuyên khoa:</span> {doctor?.staffSpecialtyData?.name || "Đa khoa"}
                                </p>
                                <p className={"schedule"}>
                                    <span>Lịch khám: </span>
                                    <span className="time"> {doctor?.staffScheduleData?.slice(0, 3).map(item =>
                                        dayjs(item.date).locale('vi').format('dddd (DD-MM)')
                                    ).join(", ")} {" ,....."}</span>
                                </p>
                                <p className={"price"}>
                                    <span>Giá khám:</span> {formatCurrency(doctor?.price || 0)}
                                </p>
                            </div>
                        )) :
                            <div className="text-center">Không tìm thấy bác sĩ</div>}
                    </div>
                }

            </div>

        </>
    );
}
export default BookingDoctor;