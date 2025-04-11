import { useLocation, useNavigate } from "react-router-dom";
import "./AppoimentList.scss";
import userService from "@/services/userService";
import { message, Skeleton } from "antd";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCalendarCheck, faCircleUser, faClock, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "@/utils/formatDate";
import { faBriefcaseMedical, faLocationDot, faMobileScreen, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import { STATUS_BE, TABLE, TIMESLOTS } from "@/constant/value";
import dayjs from "dayjs";
import { PATHS } from "@/constant/path";
import { useMutation } from "@/hooks/useMutation";
import ConfirmModal from "../../components/ConfirmModal/confirmModal";
import { OldParaclinicalModal } from "@/components/Modals";


const AppointmentList = () => {
    let [show, setShow] = useState(false);
    let [showOldParaclinicalModal, setShowOldParaclinicalModal] = useState(false);
    let [obAppoinment, setObAppoinment] = useState(null);
    const location = useLocation();
    let navigate = useNavigate();
    let [listAppoinment, setListAppoinment] = useState([]);
    let [isLoading, setIsLoading] = useState(null);
    const queryParams = new URLSearchParams(location.search);
    const {
        data: appoinmentData,
        loading: appoinmentLoading,
        execute: getAppoinment,
    } = useMutation(() => userService.getAppoinment({ status: 2 }));

    useEffect(() => {
        let confirmToken = queryParams.get('confirm');
        if (confirmToken !== null) {
            const fetchConfirmAsync = async () => {
                const response = await userService.confirmTokenBooking({ token: confirmToken });
                if (response?.EC === 0 || response?.EC === 1) {
                    message.success(response?.EM);
                    navigate(PATHS.HOME.APPOINTMENT_LIST);
                } else {
                    message.error(response?.EM);
                    navigate(PATHS.HOME.APPOINTMENT_LIST);
                }
            };
            fetchConfirmAsync();
        }
    }, []);
    useEffect(() => {
        getAppoinment();
    }, [location]);
    useEffect(() => {
        if (appoinmentData) {
            setListAppoinment(appoinmentData.DT);
        }
    }, [appoinmentData]);
    let handleCheckOut = async (profile) => {
        setIsLoading(profile.id);
        try {
            const response = await userService.checkOutAppointment({ id: profile.id });
            if (response?.EC === 0) {
                window.location.href = response?.DT?.shortLink;
            } else {
                message.error(response?.EM);
            }
        } catch (e) { console.log(e); }
        finally { setIsLoading(null) }
    }
    const refresh = () => {
        setObAppoinment(null);
        getAppoinment();
    }
    const handleUpdateOldParaclinical = async (images) => {
        try {
            const response = await userService.updateOldParaclinical({ id: obAppoinment.id, oldParaclinical: images })
            if (response?.EC === 0) {
                message.success(response?.EM)
                refresh()
            } else { message.error(response?.EM) }
        } catch (e) { console.log(e); message.error("Lỗi cập nhật phiếu khám cũ") }
    }
    return (
        <div className="bg-white" >
            <Container>
                <div className="appoinment-list">
                    <div>
                        <div className="title">Danh sách lịch hẹn</div>
                    </div>
                    <div className="list-item-app">
                        {
                            appoinmentLoading ? Array.from({ length: 5 }, (_, index) => (
                                <div className="skeleton-card " key={index}>
                                    <div className="d-flex justify-content-between h-75">
                                        <Skeleton paragraph={5} style={{ width: "80%", height: "120px" }} active />
                                        <Skeleton paragraph={5} style={{ width: "80%", height: "120px" }} active />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <Skeleton.Button active style={{ width: "150px", height: "60px" }} />
                                    </div>
                                </div>
                            )) :
                                listAppoinment?.length > 0 && listAppoinment.map((profile, index) => (
                                    <div className="patient-card" key={index}>
                                        <div className="patient-info row">
                                            <div className="col-6">
                                                <div className="text-in row">
                                                    <div className="col-3">
                                                        <FontAwesomeIcon icon={faCircleUser} /> <span className="b">Họ và tên:</span>
                                                    </div>
                                                    <span className="c col-8">{profile?.userExaminationData?.lastName + " " + profile?.userExaminationData?.firstName}</span>
                                                </div>
                                                <div className="text-in row">
                                                    <div className="col-3">
                                                        <FontAwesomeIcon icon={faAddressCard} />  <span className="b">CCCD:</span>
                                                    </div>
                                                    <span className="c col-8">{profile?.userExaminationData?.cid || "Chưa cập nhật"}</span>
                                                </div>
                                                <div className="text-in row">
                                                    <div className="col-3">
                                                        <FontAwesomeIcon icon={faEnvelope} />  <span className="b">Email:</span>
                                                    </div>
                                                    <span className="c col-8">{profile?.userExaminationData?.email || "Chưa cập nhật"}</span>
                                                </div>
                                                <div className="text-in row">
                                                    <div className="col-3">
                                                        <FontAwesomeIcon icon={faCalendarCheck} /><span className="b">Ngày sinh:</span>
                                                    </div>
                                                    <span className="c col-8">{profile?.userExaminationData?.dob ? formatDate(profile?.userExaminationData?.dob) : "Chưa cập nhật"}</span>
                                                </div>
                                                <div className="text-in row">
                                                    <div className="col-3"> <FontAwesomeIcon icon={faMobileScreen} /> <span className="b">SĐT:</span></div>
                                                    <span className="c col-8">{profile?.userExaminationData?.phoneNumber || "Chưa cập nhật"}</span>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-in row">
                                                    <div className="col-3">
                                                        <FontAwesomeIcon icon={faVenusMars} />  <span className="b">Giới tính:</span>
                                                    </div>
                                                    <span className="c col-8">{profile?.userExaminationData?.gender === 0 ? "Nam" : "Nữ"}</span>
                                                </div>
                                                <div className="text-in row">
                                                    <div className="col-3">
                                                        <FontAwesomeIcon icon={faBriefcaseMedical} />  <span className="b">{profile?.examinationStaffData?.positon || "Bác sĩ"}:</span>
                                                    </div>
                                                    <span className="c col-8">
                                                        {profile?.examinationStaffData?.staffUserData?.lastName + " " + profile?.examinationStaffData?.staffUserData?.firstName} ( Chuyên khoa: {profile?.examinationStaffData?.staffSpecialtyData?.name})
                                                    </span>
                                                </div>
                                                <div className="text-in row">
                                                    <div className="col-3">
                                                        <FontAwesomeIcon icon={faClock} /> <span className="b">Thời gian:</span>
                                                    </div>
                                                    <span className="c col-8">{TIMESLOTS[profile?.time - 1].label} ngày {formatDate(profile?.admissionDate || new Date())}</span>
                                                </div>
                                                <div className="text-in row">
                                                    <div className="col-3">
                                                        <FontAwesomeIcon icon={faLocationDot} /> <span className="b">Phòng:</span>
                                                    </div>
                                                    <span className="c col-8">{profile?.roomName || "Chưa cập nhật"}</span>
                                                </div>
                                            </div>
                                            <div className="text-in-tc">
                                                <span>Triệu chứng: </span>
                                                <span className="c"> {profile?.symptom || "Chưa cập nhật"}</span>
                                            </div>
                                        </div>
                                        <div className="patient-actions">
                                            {profile?.status === STATUS_BE.INACTIVE &&  //Đã hủy
                                                <span className="btn cancel">{profile?.paymentId ? "Đã hoàn tiền" : "Đã hủy"}</span>}
                                            {profile?.status !== STATUS_BE.INACTIVE && profile?.status !== STATUS_BE.PENDING && <span className="status-success">Đã hoàn thành</span>  //Đã xác nhận}
                                            }
                                            {profile?.status === STATUS_BE.PENDING &&  //Chờ xác nhận}
                                                <>
                                                    {profile?.paymentId ?  //Đã thanh toán (tiền bác sĩ=1 và đã có mã thanh toán)
                                                        <span className="status-success">Đã thanh toán</span>
                                                        :
                                                        <button disabled={isLoading} className="btn checkout" onClick={() => { handleCheckOut(profile) }}>{isLoading === profile?.id && <i class="fa-solid fa-spinner fa-spin-pulse"></i>} Thanh toán</button>
                                                    }
                                                    <button className="btn old-paraclinical" onClick={() => { setObAppoinment(profile), setShowOldParaclinicalModal(true) }}>Thêm phiếu xét nghiệm</button>

                                                    {// Không hiện nút hủy lịch hẹn nếu lịch hẹn đã qua
                                                        !dayjs(profile?.admissionDate).isBefore(dayjs().add(1, 'day').startOf('day')) &&
                                                        <button className="btn delete" onClick={() => { setObAppoinment(profile), setShow(true) }}>Hủy lịch hẹn</button>}
                                                </>
                                            }
                                        </div>

                                    </div>
                                ))}
                    </div>
                </div>
            </Container>
            <ConfirmModal
                show={show}
                isShow={(value) => setShow(value)}
                data={obAppoinment}
                refresh={refresh}
                table={TABLE.EXAMINATION}
                key={obAppoinment ? obAppoinment.id + " " + Date.now() : "modal-closed"} />
            <OldParaclinicalModal
                visible={showOldParaclinicalModal}
                onCancel={() => setShowOldParaclinicalModal(false)}
                oldParaclinical={obAppoinment?.oldParaclinical}
                onSave={handleUpdateOldParaclinical}
            />
        </div>
    );
}

export default AppointmentList;