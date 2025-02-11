import React from 'react';
import { FaDollarSign, FaUserCheck, FaStar, FaStethoscope } from 'react-icons/fa';
import './doctorCard.scss';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constant/path';

const DoctorCard = ({ id, avatar, name, specialty, price, visits, rating }) => {
  let navigate = useNavigate();
  const avtTest = avatar || 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fmedpro-production%2Fdigimed%2Fdoctors%2F1712976261086-BS_THUY_VAN.png&w=1920&q=75'
  return (
    <div className="doctor-card">
      <img src={avtTest} alt={`${name}'s avatar`} className="doctor-card__avatar" />
      <h4 className="doctor-card__name">{name}</h4>
      <div className="doctor-card__info">

        <p className="doctor-card__specialty" style={{ display: "flex", alignItems: "center", gap: "10px" }} >
          <FaStethoscope className="doctor-card__icon" /> Khoa: {specialty || "Đa khoa"}
        </p>
        <div className="doctor-card__details">
          <p className="doctor-card__price" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaDollarSign className="doctor-card__icon" /> Giá khám: {price}
          </p>
          <p className="doctor-card__visits" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaUserCheck className="doctor-card__icon" /> Lượt khám: {visits}
          </p>
          <p className="doctor-card__rating" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaStar className="doctor-card__icon" /> Đánh giá: {rating} ⭐
          </p>
        </div>
      </div>
      <div className='btn-booking' onClick={() => { navigate(PATHS.HOME.DOCTOR_DETAIL + "/" + id) }}>Xem chi tiết</div>
    </div>
  );
};

export default DoctorCard;
