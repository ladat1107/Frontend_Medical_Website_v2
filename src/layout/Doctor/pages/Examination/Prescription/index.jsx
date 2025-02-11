import './Prescription.scss';
import Presdetail from '../Presdetail';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@/hooks/useMutation';
import { getAllMedicinesForExam, getPrescriptionByExaminationId, upsertPrescription } from '@/services/doctorService';
import PropTypes from 'prop-types';
import { message, notification, Spin } from 'antd';

const Prescription = ({ examinationId, paraclinicalPrice, refresh }) => {
    const [presDetails, setPresDetails] = useState([]);
    const [medicineOptions, setMedicineOptions] = useState([]);
    const [note, setNote] = useState('');
    const [prescriptionPrice, setPrescriptionPrice] = useState(0);
    const [nextId, setNextId] = useState(1);
    const [totalMoney, setTotalMoney] = useState(0);
    const [insuranceCoverage, setInsuranceCoverage] = useState(0);

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message, type = 'info') => {
        api[type]({
            message: message,
            placement: 'bottomRight',
        });
    };

    let {
        data: dataMedicines,
        loading: comorbiditiesLoading,
        error: comorbiditiesError,
        execute: fetchMedicines,
    } = useMutation(() => getAllMedicinesForExam());

    useEffect(() => {
        fetchMedicines();
        fetchPrescription();
    }, []);

    useEffect(() => {
        if (dataMedicines && dataMedicines.DT) {
            const medicineOptions = dataMedicines.DT.map(item => ({
                value: item.id,
                label: item.name,
                price: item.price,
                unit: item.unit,
            }));
            setMedicineOptions(medicineOptions);
        }
    }, [dataMedicines]);

    let {
        data: dataPrescription,
        loading: prescriptionLoading,
        error: prescriptionError,
        execute: fetchPrescription,
    } = useMutation(() => getPrescriptionByExaminationId(examinationId));



    useEffect(() => {
        if (dataPrescription && dataPrescription.DT) {
            const details = dataPrescription.DT.prescriptionDetails.map((detail, index) => ({
                id: index,  // Tạo ID duy nhất
                medicineId: detail.id,
                quantity: detail.PrescriptionDetail.quantity,
                unit: detail.PrescriptionDetail.unit,
                price: detail.PrescriptionDetail.price,
                dosage: detail.PrescriptionDetail.dosage
            }));
            setPresDetails(details);
            setNote(dataPrescription.DT.note);
            setPrescriptionPrice(dataPrescription.DT.totalMoney);
            setNextId(details.length + 1);

            // setTotalMoney(dataPrescription.DT.totalMoney + paraclinicalPrice - insuranceCoverage);
            setTotalMoney(dataPrescription.DT.totalMoney - insuranceCoverage);
        }
    }, [dataPrescription]);

    const handleAddPresdetail = useCallback(() => {
        setPresDetails(prevDetails => [
            ...prevDetails,
            {
                id: nextId,
                medicineId: 0,
                quantity: 1,
                unit: '',
                price: 0,
                dosage: ''
            }
        ]);
        setNextId(prevId => prevId + 1);
    }, [nextId]);

    const handleDeletePresdetail = useCallback((id) => {
        setPresDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
    }, []);

    const handlePresdetailChange = useCallback((id, medicineId, quantity, unit, price, dosage) => {
        setPresDetails(prevDetails =>
            prevDetails.map(detail =>
                detail.id === id ? { ...detail, medicineId, quantity, unit, price, dosage } : detail
            )
        );
    }, []);

    useEffect(() => {
        const totalPrice = presDetails.reduce((sum, detail) => sum + detail.quantity * detail.price, 0);
        setPrescriptionPrice(totalPrice);
    }, [presDetails]);

    const handleSaveButton = async () => {
        for (const detail of presDetails) {
            if (!detail.medicineId || !detail.quantity || !detail.unit || !detail.price || !detail.dosage) {
                openNotification('Vui lòng điền đầy đủ thông tin thuốc!', 'error');
                return;
            }
        }

        const data = {
            examinationId: examinationId,
            note: note,
            totalMoney: prescriptionPrice,
            prescriptionDetails: presDetails.map(detail => ({
                medicineId: detail.medicineId,
                quantity: detail.quantity,
                unit: detail.unit,
                price: detail.price,
                dosage: detail.dosage
            }))
        };

        try {
            const response = await upsertPrescription(data);
            if (response && response.EC === 0 && response.DT === true) {
                message.success('Lưu đơn thuốc thành công!');
                refresh();
            } else {
                message.error(response.EM || 'Lưu đơn thuốc thất bại!');
            }
        } catch (error) {
            console.error("Lỗi khi tạo đơn thuốc:", error.response || error.message);
            openNotification('Lưu đơn thuốc thất bại.', 'error');
        }
    };

    const sortedPresDetails = useMemo(() => {
        return [...presDetails].sort((a, b) => b.id - a.id);
    }, [presDetails]);

    return (
        <>
            {contextHolder}
            <div className="pres-container">
                <div className="row padding">
                    <div className='col-8 col-lg-3 button'>
                        <button className='add-button' onClick={handleAddPresdetail}>Thêm thuốc</button>
                        <button className='save-button' onClick={handleSaveButton}>Lưu</button>
                    </div>
                </div>
                {prescriptionLoading ? (
                    <div className="loading text-center mt-1 mb-1">
                        <Spin />
                    </div>
                ) : (
                    <>
                        <div className="row padding gap">
                            {sortedPresDetails.length > 0 ? (
                                sortedPresDetails.map(detail => (
                                    <Presdetail
                                        key={detail.id}
                                        id={detail.id}
                                        options={medicineOptions}
                                        presdetailData={detail}
                                        onDelete={() => handleDeletePresdetail(detail.id)}
                                        onChange={handlePresdetailChange}
                                    />
                                ))
                            ) : (
                                <div className="empty-list-message">
                                    <p>Đơn thuốc trống</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
                <hr className='mt-2' style={{
                    borderStyle: 'dashed',
                    borderWidth: '1px',
                    borderColor: '#007BFF',
                    opacity: '1'
                }} />
                <div className="row padding" style={{ alignItems: "self-start" }}>
                    <div className='col-2'>
                        <p className='title'>Ghi chú:</p>
                    </div>
                    <div className='col-10'>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            type="text"
                            className="input"
                            style={{ minHeight: '100px' }}
                            placeholder="Nhập ghi chú" />
                    </div>
                </div>
                <div className="row padding">
                    <div className='col-2'>
                        <p className='title'>Chi phí thuốc:</p>
                    </div>
                    <div className='col-10'>
                        <p className='payment'>{prescriptionPrice.toLocaleString()} VND</p>
                    </div>
                </div>
                {/* <div className="row padding">
                    <div className='col-2'>
                        <p className='title'>Dịch vụ kỹ thuật:</p>
                    </div>
                    <div className='col-10'>
                        <p className='payment'>{paraclinicalPrice.toLocaleString()} VND</p>
                    </div>
                </div> */}
                {/* <div className="row padding">
                    <div className='col-2'>
                        <p className='title'>BHYT thanh toán:</p>
                    </div>
                    <div className='col-10'>
                        <p className='payment'>{insuranceCoverage.toLocaleString()} VND</p>
                    </div>
                </div>
                <hr />
                <div className="row padding">
                    <div className='col-2'>
                        <p className='title'>Người bệnh trả:</p>
                    </div>
                    <div className='col-10'>
                        <p className='payment'>{totalMoney.toLocaleString()} VND</p>
                    </div>
                </div> */}
            </div>
        </>
    )
}
Prescription.propTypes = {
    examinationId: PropTypes.number.isRequired,
    paraclinicalPrice: PropTypes.number.isRequired,
    refresh: PropTypes.func.isRequired,
};

export default Prescription;