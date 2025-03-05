import "./Examination.scss";
import ExamInfo from "./Examinfo";
import VitalSign from "./Vitalsign";
import Paraclinical from "./paraclinical";
import Prescription from "./Prescription";
import { useEffect, useState } from "react";
import { getAllDisease, getExaminationById } from "@/services/doctorService";
import { useMutation } from "@/hooks/useMutation";
import { convertDateTime } from "@/utils/formatDate";
import { convertGender } from "@/utils/convertGender";
import { useParams } from "react-router-dom";
import { Modal, Spin } from "antd";
import HistoryModal from "../../components/HistoryModal/HistoryModal";

const Examination = () => {
    const { examId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const [selectedRadio, setSelectedRadio] = useState('vitalsign');
    const [patientData, setPatientData] = useState({});
    const [examinationData, setExaminationData] = useState({});
    const [vitalSignData, setVitalSignData] = useState({});
    const [paraclinicalData, setParaclinicalData] = useState([]);
    const [prescriptionData, setPrescriptionData] = useState([]);
    const [totalParaclinical, setTotalParaclinical] = useState(0);
    const [comorbiditiesOptions, setComorbiditiesOptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(true);


    useEffect(() => {
        if (isModalOpen) {
            if (isModalOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }

            return () => {
                document.body.style.overflow = 'unset';
            };
        }
    }, [isModalOpen]);

    // Fetch comorbidities
    const {
        data: dataComorbidities,
        loading: comorbiditiesLoading,
        error: comorbiditiesError,
        execute: fetchComorbidities,
    } = useMutation(() => getAllDisease());

    useEffect(() => {
        if (dataComorbidities?.DT) {
            const options = dataComorbidities.DT.map(item => ({
                value: item.code,
                label: item.disease,
            }));
            setComorbiditiesOptions(options);
        }
    }, [dataComorbidities]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchComorbidities();
        if (examId) {  // Thêm check để đảm bảo có examId
            fetchExaminationData();
        }
    }, []);

    let refresh = () => {
        fetchExaminationData();
    }

    let {
        data: dataExamination,
        loading: examinationLoading,
        error: examinationError,
        execute: fetchExaminationData,
    } = useMutation((query) =>
        getExaminationById(+examId)
    );

    useEffect(() => {
        if (dataExamination && dataExamination.DT) {
            const fields = [
                "id", "userId", "staffId", "symptom", "diseaseName", "comorbidities",
                "treatmentResult", "admissionDate", "dischargeDate", "status",
                "reason", "medicalTreatmentTier", "paymentDoctorStatus",
                "price", "special", "insuranceCoverage"
            ];

            const disease = dataExamination.DT?.diseaseName?.split(" - ") || "";

            const formattedData = {
                ...Object.fromEntries(fields.map(field => [field, dataExamination.DT[field] || ""])),
                admissionDate: dataExamination.DT.admissionDate,
                dischargeDate: dataExamination.DT.dischargeDate,
                diseaseName: disease[0],
                staffName: dataExamination.DT.examinationStaffData?.staffUserData?.lastName + " " +
                    dataExamination.DT.examinationStaffData?.staffUserData?.firstName || ""
            };
            const totalParaclinicalPrice = (dataExamination.DT.examinationResultParaclincalData || []).reduce(
                (sum, item) => sum + (item.price || 0),
                0
            );
            setTotalParaclinical(totalParaclinicalPrice);
            setExaminationData(formattedData);

            setPatientData(dataExamination.DT.userExaminationData || {});
            setVitalSignData(dataExamination.DT.examinationVitalSignData || {});
            setParaclinicalData(dataExamination.DT.examinationResultParaclincalData || []);
            setPrescriptionData(dataExamination.DT.prescriptionExamData || []);

            if(dataExamination.DT.status === 7) setIsEditMode(false);

            setIsLoading(false);
        }
    }, [dataExamination]);

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };

    return (
        <>
            <div className="container">
                <div className="content">
                    {isLoading ? (
                        <div className="loading text-center">
                            <Spin />
                        </div>
                    ) : (
                        <>
                            <div className="exam-content">
                                <div className="row">
                                    <div className="col-10">
                                        <p className="exam-header">Thông tin bệnh nhân</p>
                                    </div>
                                    <div className="col-2">
                                        <button
                                            onClick={showModal}
                                            className='history-button'>
                                            Lịch sử khám bệnh
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    {patientData && patientData.cid &&
                                        <>
                                            <div className="col-12 col-lg-5 mb-0">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <p className="title">Họ tên</p>
                                                    </div>
                                                    <div className="col-8">
                                                        <p className="info">
                                                            {patientData.lastName + " " + patientData.firstName}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <p className="title">Ngày sinh</p>
                                                    </div>
                                                    <div className="col-8">
                                                        <p className="info">{convertDateTime(patientData.dob)}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <p className="title">Giới tính</p>
                                                    </div>
                                                    <div className="col-8">
                                                        <p className="info">{convertGender(patientData.gender)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-5 mb-0">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <p className="title">Số điện thoại</p>
                                                    </div>
                                                    <div className="col-8">
                                                        <p className="info">{patientData.phoneNumber}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <p className="title">CCCD</p>
                                                    </div>
                                                    <div className="col-8">
                                                        <p className="info">{patientData.cid}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <p className="title">BHYT:</p>
                                                    </div>
                                                    <div className="col-8">
                                                        <p className="info">{patientData.userInsuranceData?.insuranceCode}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="exam-content">
                                <p className="exam-header">Thông tin khám bệnh</p>
                                <div className="radio-inputs row">
                                    <div className="col-6 col-lg-2 d-flex justify-content-center">
                                        <label className="radio">
                                            <input type="radio" name="radio"
                                                value="vitalsign"
                                                defaultChecked={selectedRadio === 'vitalsign'}
                                                onChange={handleRadioChange} />
                                            <span className="name">Sinh hiệu</span>
                                        </label>
                                    </div>
                                    <div className="col-6 col-lg-2 d-flex justify-content-center">
                                        <label className="radio">
                                            <input type="radio" name="radio"
                                                value="info"
                                                onChange={handleRadioChange} />
                                            <span className="name">
                                                Thông tin khám
                                            </span>
                                        </label>
                                    </div>
                                    <div className="col-6 col-lg-2 d-flex justify-content-center">
                                        <label className="radio">
                                            <input type="radio" name="radio"
                                                value="paraclinical"
                                                onChange={handleRadioChange} />
                                            <span className="name">Cận lâm sàng</span>
                                        </label>
                                    </div>
                                    <div className="col-6 col-lg-2 d-flex justify-content-center">
                                        <label className="radio">
                                            <input type="radio" name="radio"
                                                value="prescription"
                                                onChange={handleRadioChange} />
                                            <span className="name">Đơn thuốc</span>
                                        </label>
                                    </div>
                                </div>
                                <hr className="m-0" />
                                <div className="radio-content">
                                    {selectedRadio === 'info' && (
                                        <ExamInfo
                                            refresh={refresh}
                                            examData={examinationData}
                                            comorbiditiesOptions={comorbiditiesOptions}
                                            isEditMode={isEditMode}
                                        />
                                    )}
                                    {selectedRadio === 'vitalsign' && patientData && patientData.id && (
                                        <VitalSign
                                            refresh={refresh}
                                            vitalSignData={vitalSignData}
                                            examId={examinationData.id}
                                            isEditMode={isEditMode}
                                        />
                                    )}
                                    {selectedRadio === 'paraclinical' && (
                                        <Paraclinical
                                            refresh={refresh}
                                            listParaclinicals={paraclinicalData}
                                            examinationId={examinationData.id}
                                            isEditMode={isEditMode}
                                        />
                                    )}
                                    {selectedRadio === 'prescription' && (
                                        <Prescription
                                            refresh={refresh}
                                            examinationId={examinationData.id}
                                            paraclinicalPrice={totalParaclinical}
                                            prescriptionData={prescriptionData}
                                            isEditMode={isEditMode}
                                        />
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {!isLoading && (
                    <div className="modal-history-content">
                        <HistoryModal
                            isModalOpen={isModalOpen}
                            handleCancel={handleCancel}
                            userId={patientData.id}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default Examination;