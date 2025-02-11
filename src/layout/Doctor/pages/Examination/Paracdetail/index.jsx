import SelectBox2 from "@/layout/Doctor/components/Selectbox";
import { Form, message, Progress } from 'antd';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './Paracdetail.scss'
import { CloudUploadOutlined } from '@ant-design/icons';
import { CLOUDINARY_FOLDER } from "@/constant/value";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";


const Paracdetail = ({ id, paraclinicalData }) => {

    const [paraclinicalName, setParaclinicalName] = useState(paraclinicalData.paraclinicalData.name || '');
    const [result, setResult] = useState(paraclinicalData.result || '');
    const [description, setDescription] = useState(paraclinicalData.description || '');
    const [image, setImage] = useState(paraclinicalData.image || '');
    const [price, setPrice] = useState(paraclinicalData.price || 0);

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [doctorName, setDoctorName] = useState(
        !paraclinicalData.doctorParaclinicalData ? '' :
        paraclinicalData.doctorParaclinicalData.staffUserData.lastName + ' ' + paraclinicalData.doctorParaclinicalData.staffUserData.firstName
    );

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true); // Bắt đầu upload
        setUploadProgress(0); // Đặt lại tiến trình về 0
        try {
            // Gọi hàm upload với callback để cập nhật tiến trình
            const url = await uploadToCloudinary(file, CLOUDINARY_FOLDER.DEPARTMENT, (progress) => {
                setUploadProgress(progress);
            });
            setImage(url); // Cập nhật ảnh
            message.success("Upload thành công!");
        } catch (error) {
            message.error("Upload thất bại. Vui lòng thử lại.");
            console.error(error);
        } finally {
            setUploading(false); // Kết thúc upload
        }
    };

    const zoomImage = () => {
        window.open(image, "_blank");
    }


    return (
        <>
            <div className="paracdetail-container">
                <div className="row">
                    <div className="col-5 mt-3 col-lg-2">
                        <p>Loại xét nghiệm:</p>
                    </div>
                    <div className="col-7 mt-3 col-lg-10">
                        <input
                            type="text"
                            className="input"
                            value={paraclinicalName}
                            placeholder="Tên loại xét nghiệm"
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="row">
                
                    <div className="col-5 mt-3 col-lg-2">
                        <p>Bác sĩ thực hiện:</p>
                    </div>
                    <div className="col-7 mt-3 col-lg-3">
                        <p className="info">{doctorName}</p>
                    </div>
                    <div className="col-5 mt-3 col-lg-1"  style={{padding: 0}}>
                        <p>Kết quả:</p>
                    </div>
                    <div className="col-7 mt-3 col-lg-6">
                        <input type="text"
                            className="input"
                            value={result}
                            disabled={true}
                            placeholder="Kết quả xét nghiệm" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-5 mt-3 col-lg-2">
                        <p>Mô tả:</p>
                    </div>
                    <div className="col-7 mt-3 col-lg-10">
                        <textarea type="text"
                            className="input"
                            value={description}
                            disabled={true}
                            placeholder="Mô tả chi tiết kết quả" />
                    </div>
                </div>
                <div className="row align-items-start">
                    <div className="col-5 mt-3 col-lg-2">
                        <p>Giá</p>
                    </div>
                    <div className="col-7 mt-3 col-lg-3">
                        <p className="info">{price.toLocaleString()} VND</p>
                    </div>
                    <div className="col-12 mt-3 col-lg-1" style={{padding: 0}}>
                        <p className="text-start" style={{padding: 0}}>Hình ảnh:</p>
                    </div>
                    <div className="col-12 mt-3 col-lg-6">
                        <Form.Item>
                            <div className='image-upload'>
                                <div className='container'>
                                    <span className='image-cloud'><i className="fa-regular fa-image"></i></span>
                                    <div>
                                        <span htmlFor={`input-upload-${id}`} className='input-upload'>
                                            Hình ảnh
                                        </span> cận lâm sàn.
                                    </div>
                                    {image && (
                                        <div>
                                            <img src={image} 
                                                alt="Uploaded" 
                                                style={{ width: "100%", cursor: "pointer" }} 
                                                onClick={zoomImage}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <input type="file" id={`input-upload-${id}`} hidden={true} onChange={handleImageChange} />
                        </Form.Item>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}
Paracdetail.propTypes = {
    id: PropTypes.number.isRequired,
    paraclinicalData: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSaveResult: PropTypes.func.isRequired,
};

export default Paracdetail;