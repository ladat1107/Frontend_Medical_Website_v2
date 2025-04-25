import './InpatientList.scss'
import { useEffect, useState } from 'react';
import InpatientVitals from './InpatientVitals';
import InpatientParacs from './InpatientParacs';
import InpatientPres from './InpatientPres';
import MultiSelect from '../../components/MultiSelect';
import SelectBox2 from '../../components/Selectbox';
import { useParams } from 'react-router-dom';
import { useMutation } from '@/hooks/useMutation';
import { getAllDisease, getExaminationById } from '@/services/doctorService';
import { Spin } from 'antd';

const InpatientDetail = () => {
    
    const { examId } = useParams();
    const [selectedRadio, setSelectedRadio] = useState('vitalsign');
    const [examData, setExamData] = useState({})
    const [comorbiditiesOptions, setComorbiditiesOptions] = useState([]);
    const [isEditMode, setIsEditMode] = useState(true);

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };

    const [formData, setFormData] = useState({
        reason: examData.reason || '',
        symptom: examData.symptom || '',
        diseaseName: examData.diseaseName || null,
        comorbidities: examData.comorbidities ? examData.comorbidities.split(',') : []
    });

    const handleInputChange = (field) => (event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const constHandleDiseaseChange = (value) => {
        const selectedOption = comorbiditiesOptions.find(option => option.value === value);
        const label = selectedOption ? selectedOption.label : null;

        setFormData(prev => ({
            ...prev,
            diseaseName: label
        }));
    }

    const handleComorbiditiesChange = (value) => {
        setFormData(prev => ({
            ...prev,
            comorbidities: value
        }));
    };

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
            setExamData(dataExamination.DT);
            if (dataExamination.DT.status === 7) setIsEditMode(false);
        }
    }, [dataExamination]);
    
    return (
        <>
            {examinationLoading ? (
                <div className="loading text-center">
                    <Spin />
                </div>
            ) : (
                <div className="inpatient-exam-content">
                    <div className="inpatient-exam-content__header">
                        <h1>Bệnh án</h1>
                        <p className='mt-2' style={{fontSize: '20px', fontWeight: '500'}}>Nguyễn Văn A</p>
                        <div className='gray-text flex mt-2'>
                            <p className='me-3'>#100</p>
                            <p className='me-3'>•</p>
                            <p className='me-2'>Số điện thoại: </p>
                            <p className='me-3'>0823425657</p>
                            <p className='me-3'>•</p>
                            <p className='me-2'>Giới tính: </p>
                            <p className='me-3'>Nam</p>
                            <p className='me-3'>•</p>
                            <p className='me-2'>Ngày sinh: </p>
                            <p className='me-3'>08/06/2003</p>
                            <p className='me-3'>•</p>
                            <p className='me-3'>25 đường số 5, Long Trường, Thủ Đức</p>
                        </div>
                        <hr className='mt-4'/>
                    </div>
                    <div className="inpatient-exam-content__body flex mt-4">
                        <div className='col-6'>
                            <p className='title mb-2'>Thông tin nhập viện</p>
                            <div className='flex mt-2'>
                                <div className='col-4 gray-p'>Ngày nhập viện:</div>
                                <div className='col-8' style={{fontWeight: '500'}}>25/04/2025</div>
                            </div>
                            <div className='flex mt-2'>
                                <div className='col-4 gray-p'>Khoa:</div>
                                <div className='col-8' style={{fontWeight: '500'}}>Khoa da liễu</div>
                            </div>
                            <div className='flex mt-2'>
                                <div className='col-4 gray-p'>Phòng:</div>
                                <div className='col-8' style={{fontWeight: '500'}}>A5-403</div>
                            </div>
                            <div className='flex mt-2'>
                                <div className='col-4 gray-p'>Bảo hiểm y tế:</div>
                                <div className='col-8' style={{fontWeight: '500'}}>1234567890</div>
                            </div>
                            <div className='flex mt-2'>
                                <div className='col-4 gray-p'>Ưu tiên:</div>
                                <div className='col-8' style={{fontWeight: '500'}}>Người già</div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <p className='title mb-2'>Thông tin xuất viện</p>
                            <div className='flex mt-2'>
                                <div className='col-4 gray-p'>Ngày xuất viện:</div>
                                <div className='col-8' style={{fontWeight: '500'}}>--/--/20--</div>
                            </div>
                            <div className='flex mt-2'>
                                <div className='col-4 gray-p'>Kết quả điều trị:</div>
                                <div className='col-8' style={{fontWeight: '500'}}>Thành công?</div>
                            </div>
                            <div className='flex mt-2'>
                                <div className='col-4 gray-p'>Tình trạng xuất viện:</div>
                                <div className='col-8' style={{fontWeight: '500'}}>Khỏe hơn bình thường</div>
                            </div>
                            <div className='flex mt-2'>
                                <div className='col-4 gray-p'>Thời gian tái khám:</div>
                                <div className='col-3' style={{fontWeight: '500'}}>30/06/2025</div>
                                <div className='col-2 gray-p'>Khung giờ:</div>
                                <div className='col-3' style={{fontWeight: '500'}}>7:30</div>
                            </div>
                            <div className='flex mt-3'>
                                <div className='col-8' style={{fontWeight: '500'}}>
                                    <button className='save-button'>Báo cáo bệnh án</button>                        
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inpatient-exam-content__body mt-4">
                        <p className='title mb-2'>Thông tin khám bệnh</p>
                        <div className="flex align-items-center">
                            <div className="mt-3" style={{width: '12%'}}>
                                <p>Lý do vào viện:</p>
                            </div>
                            <div className="mt-3" style={{width: '35%'}}>
                                <input type="text" className="input"
                                    readOnly={!isEditMode} 
                                    value={formData.reason}
                                    onChange={handleInputChange('reason')}
                                    placeholder="Mô tả lý do vào viện" />
                            </div>
                            <div className="mt-3" style={{width: '6%'}}/>
                            <div className="mt-3" style={{width: '12%'}}>
                                <p>Triệu chứng:</p>
                            </div>
                            <div className="mt-3" style={{width: '35%'}}>
                                <input type="text" 
                                    className="input"
                                    value={formData.symptom}
                                    readOnly={!isEditMode} 
                                    onChange={handleInputChange('symptom')}
                                    placeholder="Mô tả chi tiết triệu chứng" />
                            </div>
                        </div>
                        <div className="flex align-items-center">
                        <div className="mt-3" style={{width: '12%'}}>
                                <p>Tên bệnh chính:</p>
                            </div>
                            <div className="mt-3" style={{width: '35%'}}>
                                <SelectBox2
                                    placeholder="Nhập tên bệnh"
                                    options={comorbiditiesOptions}
                                    value={formData.diseaseName}
                                    onChange={constHandleDiseaseChange}
                                    disabled={!isEditMode}
                                />
                            </div>
                            <div className="mt-3" style={{width: '6%'}}/>
                            <div className="mt-3" style={{width: '12%'}}>
                                <p>Bệnh đi kèm:</p>
                            </div>
                            <div className="mt-3" style={{width: '35%'}}>
                                <MultiSelect
                                    options={comorbiditiesOptions}
                                    placeholder="Chọn bệnh đi kèm"
                                    onChange={handleComorbiditiesChange}
                                    disabled={!isEditMode}
                                    value={formData.comorbidities}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="inpatient-exam-content__body mt-4">
                        <div className="radio-inputs row m-0" style={{}}>
                            <div className="col-6 col-lg-2 d-flex justify-content-center p-0">
                                <label className="radio">
                                    <input type="radio" name="radio-inpatient"
                                        value="vitalsign"
                                        defaultChecked={selectedRadio === 'vitalsign'}
                                        onChange={handleRadioChange} />
                                    <span className="name">Sinh hiệu</span>
                                </label>
                            </div>
                            <div className="col-6 col-lg-2 d-flex justify-content-center p-0">
                                <label className="radio">
                                    <input type="radio" name="radio-inpatient"
                                        value="paraclinical"
                                        onChange={handleRadioChange} />
                                    <span className="name">Cận lâm sàng</span>
                                </label>
                            </div>
                            <div className="col-6 col-lg-2 d-flex justify-content-center p-0">
                                <label className="radio">
                                    <input type="radio" name="radio-inpatient"
                                        value="prescription"
                                        onChange={handleRadioChange} />
                                    <span className="name">Đơn thuốc</span>
                                </label>
                            </div>
                            <hr/>
                        </div>
                        {selectedRadio === 'vitalsign' && (
                            <div className="radio-content mt-4">
                                    <InpatientVitals/>
                            </div>
                        )}
                        {selectedRadio === 'paraclinical' && (
                            <div className='radio-content mt-4'>
                                    <InpatientParacs/>
                            </div>
                        )}
                        {selectedRadio === 'prescription' && (
                            <div className='radio-content mt-4'>
                                    <InpatientPres/>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default InpatientDetail;