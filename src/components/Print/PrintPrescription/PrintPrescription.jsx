import { useEffect } from "react";
import "./PrintPrescription.scss"
import { getPrescriptionByExaminationId } from "@/services/doctorService";

const PrintPrescription = ({ precription, doctor, patient }) => {
  useEffect(() => {
    fetchPrescription();
  }, []);

  const fetchPrescription = async () => {
    const response = await getPrescriptionByExaminationId(92);
    if (response) {
      console.log(response);
      // setPrescription(response.data);
    }
  };
  return (
    <div className="print-prescription">
      <div className="prescription">
        <div className="prescription__id">87040POSP85W-C</div>

        <div className="prescription__header">
          <h1>BỆNH VIỆN HOA SEN</h1>
          <p>Cơ sở 215 Hồng Bàng, Phường 11, Quận 5, TP.HCM</p>
          <p>Điện thoại: 0353366459</p>
        </div>

        <h2 className="prescription__title">ĐƠN THUỐC</h2>

        <div className="prescription__info">
          <div className="prescription__row">
            <span className="prescription__label">Họ tên:</span>
            <span>VÕ THỊ DIỆN</span>
          </div>

          <div className="prescription__row prescription__row--multi">
            <div>
              <span className="prescription__label">Ngày sinh:</span>
              <span>01/01/1959</span>
            </div>
            <div>
              <span className="prescription__label">Cân nặng:</span>
              <span>46.0 kg</span>
            </div>
            <div>
              <span className="prescription__label">Giới tính:</span>
              <span>Nữ</span>
            </div>
          </div>

          <div className="prescription__row">
            <span className="prescription__label">Số thẻ bảo hiểm y tế (nếu có):</span>
            <span>GB4878722110545</span>
          </div>

          <div className="prescription__row">
            <span className="prescription__label">Địa chỉ liên hệ:</span>
            <span>Ấp 3, Xã Thường Phước 2, Huyện Hồng Ngự, Tỉnh Đồng Tháp</span>
          </div>

          <div className="prescription__row">

            <span>
              <b>Chuẩn đoán: </b>
              J00-Viêm mũi họng cấp [cảm thường]; K29.5-Viêm dạ dày mạn, không đặc hiệu; E63-Thiếu dinh dưỡng khác
            </span>
          </div>
        </div>

        <div className="prescription__medications">
          <div className="prescription__label">Thuốc điều trị:</div>
          <ol>
            <li>
              <div className="prescription__med-name">
                Paracetamol + Codein phosphat - 500mg + 10mg (Effer-paralmax codein 10)
              </div>
              <div className="prescription__med-dosage">
                <span>Uống ngày 2 lần (Sáng, Chiều), mỗi lần 1 viên</span>
                <span>14 Viên</span>
              </div>
            </li>
            <li>
              <div className="prescription__med-name">
                Paracetamol + Codein phosphat - 500mg + 10mg (Effer-paralmax codein 10)
              </div>
              <div className="prescription__med-dosage">
                <span>Uống ngày 2 lần (Sáng, Chiều), mỗi lần 1 viên</span>
                <span>14 Viên</span>
              </div>
            </li>
            <li>
              <div className="prescription__med-name">
                Paracetamol + Codein phosphat - 500mg + 10mg (Effer-paralmax codein 10)
              </div>
              <div className="prescription__med-dosage">
                <span>Uống ngày 2 lần (Sáng, Chiều), mỗi lần 1 viên</span>
                <span>14 Viên</span>
              </div>
            </li>
            <li>
              <div className="prescription__med-name">
                Paracetamol + Codein phosphat - 500mg + 10mg (Effer-paralmax codein 10)
              </div>
              <div className="prescription__med-dosage">
                <span>Uống ngày 2 lần (Sáng, Chiều), mỗi lần 1 viên</span>
                <span>14 Viên</span>
              </div>
            </li>
          </ol>
        </div>

        <div className="prescription__notes">
          <b>Lời dặn: </b>
          Lời dặn bác sĩ
        </div>

        <div className="prescription__footer">
          <div className="prescription__date">Ngày 12 tháng 02 năm 2025</div>
          <div className="prescription__signature">
            <p>Bác sĩ/Y sĩ khám bệnh</p>
            <p className="prescription__signature-note">(Ký, ghi rõ họ tên)</p>
            <div className="prescription__doctor">YS. Trương Thị Ngọc Huyền</div>
          </div>
        </div>

        <div className="prescription__footnote">
          <p>- Khám lại xin mang theo đơn này.</p>
          <p>- Số điện thoại liên hệ:</p>
        </div>
      </div>
    </div>
  )
}

export default PrintPrescription;

