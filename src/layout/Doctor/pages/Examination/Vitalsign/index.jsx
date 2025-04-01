import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import "./VitalSign.scss";
import { notification } from 'antd';
import { createOrUpdateVitalSign } from "@/services/doctorService";

const VitalSign = ({ vitalSignData, examId, refresh, isEditMode }) => {

    const [formData, setFormData] = useState({
        height: vitalSignData.height || '',
        weight: vitalSignData.weight || '',
        fetalWeight: vitalSignData.fetalWeight || '',
        pulse: vitalSignData.pulse || '',
        hightBloodPressure: vitalSignData.hightBloodPressure || '',
        lowBloodPressure: vitalSignData.lowBloodPressure || '',
        temperature: vitalSignData.temperature || '',
        breathingRate: vitalSignData.breathingRate || '',
        glycemicIndex: vitalSignData.glycemicIndex || '',
    });

    const [initialVitalSign, setInitialVitalSign] = useState(formData);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const isDataChanged = JSON.stringify(formData) !== JSON.stringify(initialVitalSign);
        setIsChanged(isDataChanged);
    }, [formData, initialVitalSign]);

    const handleInputChange = (field) => (event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    //notification
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message, type = 'info') => {
        api[type]({
            message: message,
            placement: 'bottomRight',
        });
    };

    //save button
    const handleSaveButton = async () => {
        if (!formData.height || !formData.weight || !formData.pulse || !formData.hightBloodPressure ||
            !formData.lowBloodPressure || !formData.temperature || !formData.breathingRate) {
            openNotification('Vui lòng điền đầy đủ tất cả các trường!', 'error');
            return;
        }

        const data = {
            examinationId: examId,
            height: formData.height,
            weight: formData.weight,
            fetalWeight: formData.fetalWeight || null,
            pulse: formData.pulse,
            hightBloodPressure: formData.hightBloodPressure,
            lowBloodPressure: formData.lowBloodPressure,
            temperature: formData.temperature,
            breathingRate: formData.breathingRate,
            glycemicIndex: formData.glycemicIndex || null,
        }

        try {
            const response = await createOrUpdateVitalSign(data);
            if (response && response.DT) {
                openNotification('Lưu sinh hiệu thành công!', 'success');
                setInitialVitalSign(data);
                refresh();
            } else {
                openNotification('Có lỗi trong quá trình lưu sinh hiệu.', 'error');
            }
        } catch (error) {
            console.error("Error creating examination:", error.response || error.message);
            openNotification('Lưu sinh hiệu thất bại.', 'error');
        }
    }

    const handleRestoreButton = () => {
        setFormData(initialVitalSign);
    };

    return (
        <>
            {contextHolder}
            <div className="vital-container">
                <div className="row">
                    <div className="col-4 mt-3 col-lg-2">
                        <p>Chiều cao:</p>
                    </div>
                    <div className="col-8 mt-3 col-lg-4">
                        <input type="text"
                            value={formData.height}
                            onChange={handleInputChange('height')}
                            readOnly={!isEditMode} 
                            className="input"
                            placeholder="Đơn vị: cm" />
                    </div>
                    <div className="col-4 mt-3 col-lg-2">
                        <p>Cân nặng:</p>
                    </div>
                    <div className="col-8 mt-3 col-lg-4">
                        <input type="text"
                            value={formData.weight}
                            onChange={handleInputChange('weight')}
                            readOnly={!isEditMode} 
                            className="input"
                            placeholder="Đơn vị: kg" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 mt-3 col-lg-2">
                        <p>Cân nặng con:</p>
                    </div>
                    <div className="col-8 mt-3 col-lg-4">
                        <input type="text"
                            value={formData.fetalWeight}
                            onChange={handleInputChange('fetalWeight')}
                            readOnly={!isEditMode} 
                            className="input"
                            placeholder="Đơn vị: g" />
                    </div>
                    <div className="col-4 mt-3 col-lg-2">
                        <p>Mạch:</p>
                    </div>
                    <div className="col-8 mt-3 col-lg-4">
                        <input type="text"
                            value={formData.pulse}
                            onChange={handleInputChange('pulse')}
                            readOnly={!isEditMode} 
                            className="input"
                            placeholder="Đơn vị: Lần/phút" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 mt-3 col-lg-2">
                        <p>Huyết áp trên:</p>
                    </div>
                    <div className="col-8 mt-3 col-lg-4">
                        <input type="text"
                            value={formData.hightBloodPressure}
                            onChange={handleInputChange('hightBloodPressure')}
                            readOnly={!isEditMode} 
                            className="input"
                            placeholder="Đơn vị: mmHg" />
                    </div>
                    <div className="col-4 mt-3 col-lg-2">
                        <p>Huyết áp dưới:</p>
                    </div>
                    <div className="col-8 mt-3 col-lg-4">
                        <input type="text"
                            value={formData.lowBloodPressure}
                            onChange={handleInputChange('lowBloodPressure')}
                            readOnly={!isEditMode} 
                            className="input"
                            placeholder="Đơn vị: mmHg" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 mt-3 col-lg-2">
                        <p>Nhiệt độ:</p>
                    </div>
                    <div className="col-8 mt-3 col-lg-4">
                        <input type="text"
                            value={formData.temperature}
                            onChange={handleInputChange('temperature')}
                            readOnly={!isEditMode} 
                            className="input"
                            placeholder="Đơn vị: oC" />
                    </div>
                    <div className="col-4 mt-3 col-lg-2">
                        <p>Nhịp thở:</p>
                    </div>
                    <div className="col-8 mt-3 col-lg-4">
                        <input type="text"
                            value={formData.breathingRate}
                            onChange={handleInputChange('breathingRate')}
                            readOnly={!isEditMode} 
                            className="input"
                            placeholder="Đơn vị: Lần/phút" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 mt-3 col-lg-2">
                        <p>Chỉ số đường huyết:</p>
                    </div>
                    <div className="col-8 mt-3 col-lg-4">
                        <input type="text"
                            value={formData.glycemicIndex}
                            onChange={handleInputChange('glycemicIndex')}
                            readOnly={!isEditMode} 
                            className="input"
                            placeholder="Đơn vị: mg/dl" />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4 col-lg-9"></div>
                    <div className="col-8 col-lg-3 text-end">
                        <button
                            className={`restore-button ${!isChanged ? 'disabled' : ''}`}
                            onClick={handleRestoreButton}
                            disabled={!isChanged}>
                            Hoàn tác
                        </button>
                        <button
                            className={`save-button ${!isChanged ? 'disabled' : ''}`}
                            onClick={handleSaveButton}
                            disabled={!isChanged}>
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
VitalSign.propTypes = {
    examId: PropTypes.number.isRequired,
    vitalSignData: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired,
    isEditMode: PropTypes.bool.isRequired,
};

export default VitalSign;