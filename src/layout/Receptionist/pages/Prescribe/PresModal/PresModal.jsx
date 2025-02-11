import { PropTypes } from 'prop-types'; import { useEffect, useState } from 'react';
import '../../../components/PayModal/PayModal.scss';
import { formatCurrency } from '@/utils/formatCurrency';
import { getThirdDigitFromLeft } from '@/utils/numberSeries';
import { message } from 'antd';
import { checkOutPrescription, updatePrescription } from '@/services/doctorService';
import { PAYMENT_METHOD, STATUS_BE } from '@/constant/value';

const PresModal = ({ isOpen, onClose, onSusscess, presId, patientData }) => {
    const [special, setSpecial] = useState('normal');
    const [insurance, setInsurance] = useState('');
    const [insuranceCoverage, setInsuranceCoverage] = useState(null);
    let [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.CASH);

    const [data, setData] = useState({
        infouser: { firstName: '', lastName: '', cid: '' },
        infoPres: { note: '', totalMoney: '', prescriptionDetails: [] }
    });

    useEffect(() => {
        // Thêm logic ngăn cuộn trang khi modal mở
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup effect khi component unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !patientData || !presId) return;

        resetForm();

        let newSpecial = 'normal';
        let newData = {};


        newSpecial = patientData?.special || 'normal';
        newData = {
            infouser: {
                firstName: patientData?.userExaminationData?.firstName,
                lastName: patientData?.userExaminationData?.lastName,
                cid: patientData?.userExaminationData?.cid,
            },
            infoPres: {
                note: patientData?.prescriptionExamData[0]?.note,
                totalMoney: patientData?.prescriptionExamData[0]?.totalMoney,
                prescriptionDetails: patientData?.prescriptionExamData[0]?.prescriptionDetails,
            },
            price: patientData?.prescriptionExamData[0].totalMoney,
            // paracName: patientData?.paraclinicalData?.name,
        };

        setInsurance(patientData?.insuaranceCode || '');
        setInsuranceCoverage(patientData?.insuranceCoverage || null);
        setSpecial(newSpecial);
        setData(newData);

    }, [isOpen, patientData]);

    const handleInsuaranceChange = (e) => {
        const newInsurance = e.target.value;
        setInsurance(newInsurance);

        if (newInsurance.length === 10) {
            setInsuranceCoverage(getThirdDigitFromLeft(newInsurance));
        } else {
            setInsuranceCoverage(null);
        }
    };

    const handlePay = async () => {
        try {
            let presData = {
                id: presId,
                status: 2,
                exam: {
                    examId: patientData.id,
                    insuaranceCode: insurance || null,
                    insuranceCoverage: insuranceCoverage || getThirdDigitFromLeft(insurance),
                }
            };

            if (paymentMethod === PAYMENT_METHOD.CASH) {
                const responseExam = await updatePrescription({ ...presData, payment: paymentMethod });
                if (responseExam.EC === 0 && responseExam.DT.includes(1)) {
                    message.success('Cập nhật đơn thuốc thành công!');
                    onSusscess();
                    onClose();
                } else {
                    message.error('Cập nhật đơn thuốc thất bại!');
                }
            } else {
                const response = await checkOutPrescription(presData);
                if (response.EC === 0) {
                    window.location.href = response?.DT?.shortLink;
                } else {
                    message.error(response.EM);
                }
            }

        } catch (error) {
            console.log(error);
            message.error('Cập nhật đơn thuốc thất bại!');
        }
    };

    const resetForm = () => {
        setSpecial('normal');
        setInsurance('');
        setInsuranceCoverage(null);
    };

    const SpecialText = ({ special }) => {
        let specialClass = '';
        let specialText = '';

        switch (special) {
            case 'normal':
                specialClass = 'special';
                specialText = '';
                break;
            case 'old':
                specialClass = 'special-old';
                specialText = 'Người già';
                break;
            case 'children':
                specialClass = 'special-children';
                specialText = 'Trẻ em';
                break;
            case 'disabled':
                specialClass = 'special-disabled';
                specialText = 'Người tàn tật';
                break;
            case 'pregnant':
                specialClass = 'special-pregnant';
                specialText = 'P.nữ mang thai';
                break;
            default:
                specialClass = 'special';
        }

        return <p className={`special ${specialClass}`}>{specialText}</p>;
    };

    if (!isOpen) return null;

    return (
        <div className="payment-container">
            <div className="payment-content">
                <div className='payment-header'>
                    Thông tin đơn thuốc
                </div>

                <div className='row'>
                    <div className='col-12 d-flex flex-row'>
                        <div className='col-3'>
                            <p style={{ fontWeight: "400" }}>Bệnh nhân:</p>
                        </div>
                        <div className='col-8'>
                            <p>{data.infouser.lastName + ' ' + data.infouser.firstName}</p>
                        </div>
                    </div>
                    <div className='col-12 d-flex flex-row mt-3'>
                        <div className='col-3 d-flex align-items-center'>
                            <p style={{ fontWeight: "400" }}>CCCD/CMND:</p>
                        </div>
                        <div className='col-3'>
                            <p>{data.infouser.cid}</p>
                        </div>
                        <div className='col-1' />
                        <div className='col-2 d-flex align-items-center'>
                            <p style={{ fontWeight: "400" }}>Ưu tiên:</p>
                        </div>
                        <div className='col-3'>
                            {SpecialText({ special })}
                        </div>
                    </div>
                    <hr className='mt-4' style={{
                        borderStyle: 'dashed',
                        borderWidth: '1px',
                        borderColor: '#007BFF',
                        opacity: '1'
                    }} />
                    <div className='col-12 d-flex flex-row mt-1'>
                        <div className='col-3 d-flex align-items-center'>
                            <p style={{ fontWeight: "600" }}>Đơn thuốc:</p>
                        </div>
                    </div>
                    <div className='col-12 d-flex flex-column'>
                        {data.infoPres.prescriptionDetails.map((item, index) => (
                            <div className='col-12 d-flex flex-column mt-2 pres-item' key={index}>
                                <div className='col-12 d-flex align-items-center'>
                                    <p style={{ fontWeight: "500", color: "#007BFF" }}>Tên thuốc: {item.name}</p>
                                </div>
                                <div className='col-12 d-flex align-items-start'>
                                    <div className='col-7'>
                                        <p className='text-start' style={{
                                            width: "100%",
                                            wordWrap: "break-word", // Cho phép từ dài được xuống dòng
                                            overflowWrap: "break-word", // Tương tự wordWrap, hỗ trợ trình duyệt cũ
                                            whiteSpace: "normal" // Cho phép văn bản xuống dòng
                                        }}>Liều dùng: {item.PrescriptionDetail.dosage}</p>
                                    </div>
                                    <div className='col-1' />
                                    <div className='col-2 d-flex align-items-center'>
                                        <p style={{ fontWeight: "400" }}>Số lượng: {item.PrescriptionDetail.quantity}</p>
                                    </div>
                                    <div className='col-2 d-flex align-items-center'>
                                        <p>Giá: {formatCurrency(item.price)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-12 d-flex flex-row mt-4'>
                        <div className='col-3 d-flex align-items-center'>
                            <p style={{ fontWeight: "400" }}>Ghi chú:</p>
                        </div>
                        <div className='col-9'>
                            <p style={{
                                width: "100%",
                                wordWrap: "break-word", // Cho phép từ dài được xuống dòng
                                overflowWrap: "break-word", // Tương tự wordWrap, hỗ trợ trình duyệt cũ
                                whiteSpace: "normal" // Cho phép văn bản xuống dòng
                            }}>{data?.infoPres?.note || "Không có"}</p>
                        </div>
                    </div>
                    {/* <hr className='mt-4' style={{
                            borderStyle: 'dashed',
                            borderWidth: '1px',
                            borderColor: '#007BFF',
                            opacity: '1'
                        }}/> */}
                    <div className='col-12 d-flex flex-row mt-3 mb-2'>
                        <div className='col-3 d-flex align-items-center'>
                            <p style={{ fontWeight: "400" }}>Số BHYT:</p>
                        </div>
                        <div className='col-3'>
                            <input className='input-add-exam' style={{ width: "93%" }} maxLength={10}
                                type='text' value={insurance} onChange={handleInsuaranceChange}
                                placeholder='Nhập số BHYT...' />
                        </div>
                        <div className='col-1' />
                        <div className='col-2 d-flex align-items-center'>
                            <p style={{ fontWeight: "400" }}>Mức hưởng:</p>
                        </div>
                        <div className='col-2'>
                            <p>
                                {insuranceCoverage === 0 ? '' : insuranceCoverage}
                            </p>
                        </div>
                    </div>
                    <div className='col-12 d-flex flex-row mt-3'>
                        <div className='col-3 d-flex align-items-center'>
                            <p style={{ fontWeight: "400" }}>Giá thuốc:</p>
                        </div>
                        <div className='col-3'>
                            <p>{formatCurrency(data.price)}</p>
                        </div>
                        <div className='col-1' />
                        <div className='col-5 d-flex'>
                            {+patientData?.status === STATUS_BE.PAID ? <div>Đã thanh toán</div> :
                                <>
                                    <label className='me-5'>
                                        <input
                                            className='radio'
                                            type="radio"
                                            value={PAYMENT_METHOD.CASH}
                                            checked={paymentMethod === PAYMENT_METHOD.CASH}
                                            onChange={() => setPaymentMethod(PAYMENT_METHOD.CASH)}
                                        />
                                        Tiền mặt
                                    </label>
                                    <label className='ms-4' >
                                        <input
                                            className='radio'
                                            type="radio"
                                            value={PAYMENT_METHOD.MOMO}
                                            checked={paymentMethod === PAYMENT_METHOD.MOMO}
                                            onChange={() => setPaymentMethod(PAYMENT_METHOD.MOMO)}
                                        />
                                        Chuyển khoản
                                    </label>
                                </>}
                        </div>
                    </div>
                </div>
                <div className='payment-footer mt-2'>
                    <button className="close-user-btn" onClick={onClose}>Đóng</button>
                    <button className='payment-btn' onClick={handlePay}>Xác nhận</button>
                </div>
            </div>
        </div>
    )
}

PresModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSusscess: PropTypes.func.isRequired,
    special: PropTypes.string,
    presId: PropTypes.number,
    patientData: PropTypes.object
}

export default PresModal;