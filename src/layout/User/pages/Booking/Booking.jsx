import "./Booking.scss";
import Container from "@/components/Container";
import BookingInformation from "./BookingInformation";
import BookingContent from "./BookingContent/BookingContent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
import { message } from "antd";
const Booking = () => {
    let { user } = useSelector(state => state.authen);
    let [specialty, setSpecialty] = useState(null);
    let [doctor, setDoctor] = useState(null);
    let [schedule, setSchedule] = useState(null);
    let [profile, setProfile] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(PATHS.HOME.LOGIN);
            message.info("Vui lòng đăng nhập để đặt lịch hẹn");
        }
    }, []);

    return (
        <div className={"bg"} >
            <Container>
                <div className="appointment-home-content row d-flex jutify-content-start align-items-start ">
                    <div className="col-12 col-lg-3 py-2 pe-3">
                        <BookingInformation
                            specialty={specialty}
                            doctor={doctor}
                            schedule={schedule} />
                    </div>
                    <div className="col-12 col-lg-9 py-2 ps-2">
                        <BookingContent
                            specialty={specialty}
                            setSpecialty={setSpecialty}
                            doctor={doctor}
                            setDoctor={setDoctor}
                            schedule={schedule}
                            setSchedule={setSchedule}
                            profile={profile}
                            setProfile={setProfile} />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Booking;