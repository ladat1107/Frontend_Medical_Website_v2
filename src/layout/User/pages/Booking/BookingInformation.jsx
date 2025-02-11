import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Booking.scss"
import { faClock, faHospital } from "@fortawesome/free-regular-svg-icons";
import { faBriefcaseMedical, faHandHoldingMedical } from "@fortawesome/free-solid-svg-icons";
import { formatDateDD_MM } from "@/utils/formatDate";
const BookingInformation = (props) => {
    return (
        <div className="booking-information ">
            <div className="medical-info-card">
                <div className="card-header">Thông tin cơ sở y tế</div>
                <div className="card-body">
                    <FontAwesomeIcon className="mt-2" icon={faHospital} />
                    <div className="ms-2">
                        <div className="hospital-name">Bệnh viện Hoa Sen</div>
                        <div className="hospital-address">
                            Cơ sở 215 Hồng Bàng, Phường 11, Quận 5, TP.HCM
                        </div>
                    </div>
                </div>
                {props?.specialty && <div className="card-body">
                    <FontAwesomeIcon className="mt-1" icon={faBriefcaseMedical} />
                    <div className="ms-2">
                        <div className="hospital-name">Chuyên khoa: {props.specialty.name}</div>

                    </div>
                </div>}
                {props?.doctor && <div className="card-body">
                    <FontAwesomeIcon className="mt-1" icon={faHandHoldingMedical} />
                    <div className="ms-2">
                        <div className="hospital-name">{props?.doctor?.position || BS}. {props?.doctor?.staffUserData.lastName + " " + props?.doctor?.staffUserData.firstName}</div>

                    </div>
                </div>}
                {props?.schedule && <div className="card-body">
                    <FontAwesomeIcon className="mt-1" icon={faClock} />
                    <div className="ms-2">
                        <div className="hospital-name">Thời gian: </div>
                        <div className="hospital-address">
                            Ngày {formatDateDD_MM(props.schedule.date)}   ({props.schedule.time.label})
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    );
}
export default BookingInformation;