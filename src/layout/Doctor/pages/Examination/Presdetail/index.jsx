import React, { useEffect, useState } from 'react';
import './Presdetail.scss';
import SelectBox2 from '@/layout/Doctor/components/Selectbox';
import PropTypes from 'prop-types';
import QuantityInput from '@/layout/Doctor/components/QuantityInput';

const Presdetail = ({ id, presdetailData, onDelete, options, onChange }) => {
    const [medicineId, setMedicineId] = useState(presdetailData.medicineId || 0);
    const [selectedPrice, setSelectedPrice] = useState(presdetailData.price || 0);
    const [medicineUnit, setMedicineUnit] = useState(presdetailData.unit || '');
    const [quantity, setQuantity] = useState(presdetailData.quantity || 0);
    const [dosage, setDosage] = useState(presdetailData.dosage || '');

    const handleMedicineChange = (value) => {
        const selectedMedicine = options.find(option => option.value === value);
        if (selectedMedicine) {
            setMedicineId(selectedMedicine.value);
            setSelectedPrice(selectedMedicine.price || 0);
            setMedicineUnit(selectedMedicine.unit || '');
            onChange(id, medicineId, quantity, medicineUnit, selectedMedicine.price || 0, dosage);
        }
    };

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
        onChange(id, medicineId, newQuantity, medicineUnit, selectedPrice, dosage);
    };

    useEffect(() => {
        onChange(id, medicineId, quantity, medicineUnit, selectedPrice, dosage);
    }, [id, medicineId, quantity, medicineUnit, selectedPrice, dosage, onChange]);

    return (
        <div className="presdetail-container">
            <div className="row center-content">
                <div className='col-12 col-lg-4'>
                    <div className='col-4 mt-2 col-lg-12'>
                        <p className='title'>Tên thuốc</p>
                    </div>
                    <div className='col-12 mt-1 col-lg-12'>
                        <SelectBox2
                            className="select-box2"
                            options={options}
                            value={medicineId !== 0 ? medicineId : undefined}
                            placeholder="Nhập tên thuốc"
                            onChange={handleMedicineChange}
                        />
                    </div>
                </div>
                <div className='col-6 mt-2 col-lg-2'>
                    <div className='row'>
                        <p className='title center-content'>Số lượng</p>
                    </div>
                    <div className='row mt-1'>
                        <QuantityInput
                            initialValue={quantity}
                            onChange={handleQuantityChange} />
                    </div>
                </div>
                <div className='col-3 mt-2 col-lg-1'>
                    <div className='row'>
                        <p className='title'>Đơn vị</p>
                    </div>
                    <div className='row mt-2'>
                        <p className='suptext'>{medicineUnit}</p>
                    </div>
                </div>
                <div className='col-3 mt-2 col-lg-1'>
                    <div className='row'>
                        <p className='title'>Đơn giá</p>
                    </div>
                    <div className='row mt-2'>
                        <p className='suptext'>{selectedPrice.toLocaleString()}</p>  {/* Hiển thị giá */}
                    </div>
                </div>
                <div className='col-12 mt-2 col-lg-3'>
                    <div className='row'>
                        <p className='title'>Liều dùng</p>
                    </div>
                    <div className='row mt-1 '>
                        <input
                            type="text"
                            className="input"
                            placeholder="Nhập liều dùng"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)} />
                    </div>
                </div>
                <div className='col-1 mt-2'>
                    <i className="fa-solid fa-trash red" onClick={onDelete}></i>
                </div>
            </div>
        </div>
    );
};

Presdetail.propTypes = {
    id: PropTypes.number.isRequired,
    presdetailData: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Presdetail;