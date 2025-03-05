import React, { useEffect, useState } from 'react';
import './Presdetail.scss';
import SelectBox2 from '@/layout/Doctor/components/Selectbox';
import PropTypes from 'prop-types';
import QuantityInput from '@/layout/Doctor/components/QuantityInput';
import MultiSelect from '@/layout/Doctor/components/MultiSelect';
import { padding } from '@mui/system';

const Presdetail = ({ id, presdetailData, onDelete, isEditMode, onChange }) => {
    const [medicineId, setMedicineId] = useState(presdetailData.medicineId || 0);
    const [selectedPrice, setSelectedPrice] = useState(presdetailData.price || 0);
    const [medicineName, setMedicineName] = useState(presdetailData.name || '');
    const [medicineUnit, setMedicineUnit] = useState(presdetailData.unit || '');
    const [quantity, setQuantity] = useState(presdetailData.quantity || 0);
    const [dosage, setDosage] = useState(presdetailData.dosage || '');
    const [session, setSession] = useState(presdetailData.session || []);
    const [dose, setDose] = useState(presdetailData.dose || null);

    const SessionOptions = [{ value: '1', label: 'Sáng' }, { value: '2', label: 'Trưa' }, { value: '3', label: 'Chiều' }, { value: '4', label: 'Tối' }];

    const DoseOptions = [
        { value: 1, label: '1 lần 1 viên' }, 
        { value: 2, label: '1 lần 2 viên' },
        { value: 3, label: '1 lần 3 viên' },
        { value: 4, label: '1 lần 4 viên' },
        { value: 5, label: '1 lần 5 viên' },
        { value: 6, label: '1 lần 6 viên' },
        { value: 7, label: '1 lần 7 viên' },
        { value: 8, label: '1 lần 8 viên' },
        { value: 9, label: '1 lần 9 viên' },
        { value: 10, label: '1 lần 1 chai'},
        { value: 11, label: '1 lần 2 chai'},
        { value: 12, label: '1 lần 3 chai'},
        { value: 13, label: '1 lần 4 chai'},
        { value: 14, label: '1 lần 5 chai'},
        { value: 15, label: '1 lần 6 chai'},
        { value: 16, label: '1 lần 7 chai'},
        { value: 17, label: '1 lần 8 chai'},
        { value: 18, label: '1 lần 9 chai'}
    ];
    
    const handleSessionChange = (value) => {
        setSession(value);
    }
    
    const handleDoseChange = (value) => {
        setDose(value);
    }

    useEffect(() => {
        updateDosage();
    }, [session, dose]);

    const updateDosage = () => {
        const selectedLabels = SessionOptions
            .filter(option => session.includes(option.value))
            .map(option => option.label)
            .join(', ');
        
        const doseLabel = DoseOptions
            .find(option => dose === option.value)?.label || '';

        setDosage(`${selectedLabels} - ${doseLabel}`);
    }


    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    useEffect(() => {
        onChange(id, medicineId, quantity, medicineUnit, selectedPrice, dosage, session, dose);
    }, [id, medicineId, quantity, medicineUnit, selectedPrice, dosage, onChange]);

    return (
        <div className="presdetail-container">
        {/* Header row */}
        <div className="medicine-row">
            <div className="medicine-name">
                <p className="title">Tên thuốc</p>
            </div>
            <div className="medicine-info">
                <p className="title">Số lượng</p>
                <p className="title"></p>
                <p className="title">Đơn giá</p>
            </div>
            <div className="medicine-timing">
                <p className="title">Buổi dùng</p>
            </div>
            <div className="medicine-dosage">
                <p className="title">Liều dùng</p>
            </div>
        </div>
  
    {/* Content row */}
    <div className="medicine-row">
        <div className="medicine-name">
            <p className="suptext">{medicineName}</p>   
        </div>
        <div className="medicine-info">
            <div>
                <input
                    type="text"
                    className="input"
                    placeholder="SL"
                    readOnly={!isEditMode}
                    value={quantity}
                    onChange={(e) => {
                        // Kiểm tra nếu giá trị nhập vào chỉ chứa số
                        const value = e.target.value;
                        // Chấp nhận chuỗi rỗng hoặc chỉ chứa số
                        if (value === '' || /^[0-9]+$/.test(value)) {
                            handleQuantityChange(value);
                        }
                    }}
                    onKeyPress={(e) => {
                        // Ngăn người dùng nhập ký tự không phải số
                        if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
                />
            </div>
            <div>
                <p className="suptext">{medicineUnit}</p>
            </div>
            <div>
                <p className="suptext">{selectedPrice.toLocaleString()}</p>
            </div>
        </div>
        <div className="medicine-timing">
            <MultiSelect
                options={SessionOptions}
                value={session} 
                placeholder="Chọn buổi dùng"
                onChange={handleSessionChange}
                disabled={!isEditMode}
            />
        </div>
        <div className="medicine-dosage">    
            <SelectBox2
                className="select-box2"
                options={DoseOptions}
                value={dose}
                placeholder="Chọn liều dùng"
                onChange={handleDoseChange}
                disabled={!isEditMode}
            />
        </div>
        {isEditMode && (
            <i className="fa-solid fa-trash delete-btn" onClick={onDelete}></i>
        )}
        </div>
    </div>
    );
};

Presdetail.propTypes = {
    id: PropTypes.number.isRequired,
    presdetailData: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    isEditMode: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Presdetail;