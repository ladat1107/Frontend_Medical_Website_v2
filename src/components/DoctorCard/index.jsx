import React from "react";
import "./doctorCard.scss";
import { formatCurrency } from "@/utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
const DoctorCard = ({ doctor }) => {
  let navigate = useNavigate();
  return (
    <div className="doctor-card" >
      <img className="avatar" src={doctor?.staffUserData?.avatar} alt={`${doctor?.staffUserData?.firstName} avatar`} />
      <div className="line">
        <div className="rating-right">
          <span>Đánh giá : {5} ⭐</span>
        </div>
        <div className="rating-left">
          <span>Lượt khám : {doctor?.examinationStaffData?.length || 0} 👤 </span>
        </div>
      </div>
      <div className="info">
        <p className="major" >{doctor?.position || "Bác sĩ"}</p>
        <h3 className="name">{doctor?.staffUserData?.firstName}</h3>
        <p className="specialty">🩺 {doctor?.staffDepartmentData?.name || "Đa khoa"}</p>

        <div className="price">
          Giá khám: <span>{formatCurrency(doctor?.price || 0)}</span>
        </div>
      </div>
      <div className="btn-explore" onClick={() => navigate(`${PATHS.HOME.DOCTOR_DETAIL}/${doctor?.staffUserData?.id}`)}>Xem chi tiết</div>
    </div>
  );
};

export default DoctorCard;
