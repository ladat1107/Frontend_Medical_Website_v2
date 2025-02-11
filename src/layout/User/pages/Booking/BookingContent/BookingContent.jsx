import { useState } from "react";
import "../Booking.scss"
import BookingDoctor from "./BookingDoctor";
import BookingSpecialty from "./BookingSpecialty";
import BookingCalendar from "./BookingCalendar";
import BookingPersonal from "./BookingPersonal";
import BookingConfirm from "./BookingConfirm";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
const content = {
    specialty: "specialty",
    doctor: "doctor",
    schedule: "schedule",
    information: "information",
    confirm: "confirm",
}
const BookingContent = (props) => {
    let navigate = useNavigate();
    let [currentContent, setCurrentContent] = useState(content.specialty);
    let specialty = props.specialty;
    let doctor = props.doctor;
    let schedule = props.schedule;
    let profile = props.profile;
    let handleStepSpecialty = (specialty) => {
        props.setSpecialty(specialty);
        setCurrentContent(content.doctor);
    }
    let handleStepDoctor = (value) => {
        props.setDoctor(value);
        setCurrentContent(content.schedule);
    }
    let handleStepSchedule = (value) => {
        props.setSchedule(value);
        setCurrentContent(content.information);
    }
    let handleStepInformation = (value) => {
        props.setProfile(value);
        setCurrentContent(content.confirm);
    }
    let handleStepConfirm = async () => {
    }
    return (
        <div>
            <div className="booking-content">
                {currentContent === content.specialty && <BookingSpecialty
                    next={handleStepSpecialty}
                    back={() => { navigate(PATHS.HOME.HOMEPAGE) }} />}
                {currentContent === content.doctor && <BookingDoctor
                    specialtyId={specialty?.id}
                    next={handleStepDoctor}
                    back={() => { setCurrentContent(content.specialty), props.setSpecialty(null) }} />}
                {currentContent === content.schedule && <BookingCalendar
                    doctor={doctor}
                    next={handleStepSchedule}
                    back={() => { setCurrentContent(content.doctor), props.setDoctor(null) }} />}
                {currentContent === content.information && <BookingPersonal
                    schedule={schedule}
                    profile={profile}
                    next={handleStepInformation}
                    back={() => { setCurrentContent(content.schedule), props.setSchedule(null) }}
                />}
                {currentContent === content.confirm && <BookingConfirm
                    profile={profile}
                    doctor={doctor}
                    schedule={schedule}
                    next={handleStepConfirm}
                    back={() => { setCurrentContent(content.information) }}
                />}

            </div>
        </div>

    );
}

export default BookingContent;