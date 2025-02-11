import { useState } from "react";
import PropTypes from 'prop-types';
import "./HistoryItem.scss";
import { formatDate } from "@/utils/formatDate";

const HistoryItem = ({ id, data }) => {
    const [selectedRadio, setSelectedRadio] = useState(null);

    const handleRadioChange = (e) => {
        const value = e.target.value;
        setSelectedRadio((prev) => (prev === value ? null : value));
    };

    const zoomImage = (image) => {
        window.open(image, "_blank");
    }

    return (
        <>
            <div className="history-item-content row">
                <div className="col-2 mt-4 text-center border-left" style={{ verticalAlign: 'top' }}>
                    <p style={{ fontWeight: '600', color: '#00B5F1' }}>{formatDate(data.admissionDate)}</p>
                </div>
                <div className="col-10 border-right">
                    <div className="row mt-4">
                        <p><strong>Triệu chứng: </strong>{data.symptom}</p>
                        <p><strong>Bệnh: </strong>{data.diseaseName}</p>
                        <p><strong>Ngày nhập viện: </strong>{formatDate(data.admissionDate)} - <strong>Ngày ra viện: </strong>{formatDate(data.dischargeDate)}</p>
                        <p><strong>Kết quả điều trị: </strong>{data.treatmentResult}</p>
                    </div>
                    <div className="row">
                        <div className="radio-inputs row">
                            <div className="col-6 col-lg-2 d-flex justify-content-center">
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name={`radio + ${id}`}
                                        value={`vitalsign + ${id}`}
                                        onChange={handleRadioChange}
                                        checked={selectedRadio === `vitalsign + ${id}`}
                                    />
                                    <span className="name">Sinh hiệu</span>
                                </label>
                            </div>
                            <div className="col-6 col-lg-2 d-flex justify-content-center">
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name={`radio + ${id}`}
                                        value={`paraclinical + ${id}`}
                                        onChange={handleRadioChange}
                                        checked={selectedRadio === `paraclinical + ${id}`}
                                    />
                                    <span className="name">Cận lâm sàng</span>
                                </label>
                            </div>
                            <div className="col-6 col-lg-2 d-flex justify-content-center">
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name={`radio + ${id}`}
                                        value={`prescription + ${id}`}
                                        onChange={handleRadioChange}
                                        checked={selectedRadio === `prescription + ${id}`}
                                    />
                                    <span className="name">Đơn thuốc</span>
                                </label>
                            </div>
                        </div>
                        <div className="radio-content">
                            {selectedRadio === `vitalsign + ${id}` && (
                                <div className="mt-2">
                                    {data.examinationVitalSignData ? (
                                        <div className="row">
                                            <div className="col-12 col-lg-4">
                                                <p><strong>Chiều cao: </strong>{data?.examinationVitalSignData?.height} cm</p>
                                                <p><strong>Cân nặng: </strong>{data?.examinationVitalSignData?.weight} kg</p>
                                                <p><strong>Cân nặng con: </strong>{data?.examinationVitalSignData?.fetalWeight} g</p>
                                            </div>
                                            <div className="col-12 col-lg-4">
                                                <p><strong>Huyết áp: </strong>{data?.examinationVitalSignData?.hightBloodPressure}/{data?.examinationVitalSignData?.lowBloodPressure} mmHg</p>
                                                <p><strong>Nhịp tim: </strong>{data?.examinationVitalSignData?.pulse} lần/phút</p>
                                                <p><strong>Chỉ số đường huyết: </strong>{data?.examinationVitalSignData?.glycemicIndex} mg/dl</p>
                                            </div>
                                            <div className="col-12 col-lg-4">
                                                <p><strong>Nhiệt độ: </strong>{data?.examinationVitalSignData?.temperature} oC</p>
                                                <p><strong>Nhịp thở: </strong>{data?.examinationVitalSignData?.breathingRate} lần/phút</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-3" style={{ textAlign: 'start' }}>Không có thông tin sinh hiệu</div>
                                    )}

                                </div>
                            )}
                            {selectedRadio === `paraclinical + ${id}` && (
                                <>
                                    {data.examinationResultParaclincalData && data.examinationResultParaclincalData.length > 0 ? (
                                        <div className="mt-2">
                                            {data.examinationResultParaclincalData.length > 0 && data.examinationResultParaclincalData.map((item, index) => (
                                                <div className="row" key={index}>
                                                    <div className="col-12 col-lg-12">
                                                        <p><strong>Tên: </strong>{item.paraclinicalData.name}</p>
                                                    </div>
                                                    <div className="col-12 col-lg-4">
                                                        <p><strong>Kết quả: </strong>{item.paraclinicalData.result}</p>
                                                    </div>
                                                    <div className="col-12 col-lg-8">
                                                        <p><strong>Hình ảnh: </strong>
                                                        {item.image && 
                                                            <span 
                                                                onClick={() => zoomImage(item.image)} 
                                                                style={{ fontStyle: 'italic', textDecoration: 'underline', color: '#007BFF', cursor: 'pointer' }}>Nhấn để xem
                                                            </span>}
                                                        </p>
                                                    </div>
                                                    <div className="col-12 col-lg-12">
                                                        <p><strong>Mô tả: </strong>{item.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="mt-4" style={{ textAlign: 'start' }}>Không có thông tin cận lâm sàng</div>
                                    )}
                                </>
                            )}
                            {selectedRadio === `prescription + ${id}` && (
                                <div className="mt-2">
                                    {data.prescriptionExamData[0]?.prescriptionDetails.length > 0 ? (
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr>
                                                    <th style={headerStyle}>Tên thuốc</th>
                                                    <th style={headerStyle}>Số lượng</th>
                                                    <th style={headerStyle}>Giá</th>
                                                    <th style={headerStyle}>Liều dùng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.prescriptionExamData[0]?.prescriptionDetails.map((item, index) => (
                                                    <tr key={index}>
                                                        <td style={cellStyle} >{item.name}</td>
                                                        <td style={cellStyle}>{item.PrescriptionDetail.quantity}</td>
                                                        <td style={cellStyle}>{item.price} VNĐ</td>
                                                        <td style={cellStyle}>{item.PrescriptionDetail.dosage}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="mt-3" style={{ textAlign: 'start' }}>Không có thông tin đơn thuốc</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const headerStyle = {
    border: '1px solid #333',
    padding: '8px',
    textAlign: 'center',
    backgroundColor: '#F4F7FE',
};

const cellStyle = {
    border: '1px solid #333',
    padding: '8px',
    textAlign: 'center',
};
HistoryItem.propTypes = {
    id: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
};

export default HistoryItem;
