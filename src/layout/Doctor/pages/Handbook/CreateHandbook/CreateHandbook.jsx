import './CreateHandbook.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { Form, message, Progress } from 'antd';
import { useEffect, useState } from 'react';
import { CloudUploadOutlined, } from '@ant-design/icons';
import { getHandbookById, updateHandbook, createHandbook } from '@/services/doctorService';
import { useNavigate } from 'react-router-dom';
import { CLOUDINARY_FOLDER } from '@/constant/value';
import { uploadAndDeleteToCloudinary, } from '@/utils/uploadToCloudinary';
import { useSelector } from 'react-redux';

const CreateHandbook = (props) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    let handbookId = props?.handbookId || null;
    let { user } = useSelector((state) => state.authen);
    let allTags = props?.allTags || [];
    let mdParser = new MarkdownIt();
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [image, setImage] = useState("");
    useEffect(() => {
        if (handbookId) {
            fetchHandbookData(handbookId);
        }
    }, [handbookId]);

    const fetchHandbookData = async (id) => {
        try {
            const response = await getHandbookById(id);
            if (response && response.DT) {
                let data = response.DT;
                form.setFieldsValue({
                    title: data?.title || '',
                    shortDescription: data?.shortDescription || '',
                    markDownContent: data?.handbookDescriptionData?.markDownContent || '',
                    htmlContent: data?.handbookDescriptionData?.htmlContent || '',
                });
                setImage(data?.image || '');
                let fetchedTags = data?.tags?.split(',') || [];
                let _tags = [...allTags];
                _tags = _tags.map(tag => ({
                    ...tag,
                    checked: fetchedTags.includes(tag.label),
                }));
                props.setAllTags(_tags);
            }
        } catch (error) {
            message.error('Không thể lấy dữ liệu cẩm nang');
            console.error(error);
        }
    };

    let handleEditorChange = ({ html, text }) => {
        form.setFieldsValue({ markDownContent: text, htmlContent: html }); // Cập nhật giá trị cho Form.Item
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true); // Bắt đầu upload
        setUploadProgress(0); // Đặt lại tiến trình về 0
        try {
            // Gọi hàm upload với callback để cập nhật tiến trình
            const url = await uploadAndDeleteToCloudinary(file, CLOUDINARY_FOLDER.HANDBOOK, image, (progress) => {
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

    const handleSave = async () => {
        if (!image) {
            message.error('Vui lòng chọn ảnh bìa');
            return;
        }
        form
            .validateFields()
            .then(async (values) => {
                try {
                    let activeTags = allTags.filter(tag => tag.checked).map(tag => tag.label);
                    let response;
                    if (props?.handbookId) {
                        response = await updateHandbook({ ...values, id: props.handbookId, tags: activeTags.join(','), image: image, author: user.staff });
                    } else {
                        response = await createHandbook({ ...values, tags: activeTags.join(','), image: image, author: user.staff });
                    }
                    if (response && response.EC === 0) {
                        message.success(response.EM);
                        form.resetFields();
                        props.refresh();
                    } else {
                        message.error(response.EM);
                    }
                } catch (error) {
                    message.error('Không thể lưu cẩm nang');
                    console.error(error);
                }

            })
            .catch((info) => {
                message.error('Vui lòng điền đầy đủ thông tin');
                console.log('Validate Failed:', info);
            });
    }

    return (
        <>
            <div className='create-handbook-container'>
                <Form
                    form={form}
                    name="insertHandbook"
                    initialValues={{
                        ...form.getFieldsValue(),
                    }}
                    autoComplete="on"
                >
                    <div className='row mt-2 align-items-start'>
                        <div className='col-2'>
                            <p className='text-bold'>Tiêu đề:</p>
                        </div>
                        <div className='col-6'>
                            <Form.Item name="title">
                                <div className="search-container">
                                    <i className="fa-solid fa-heading"></i>
                                    <input
                                        type="text"
                                        defaultValue={form.getFieldValue('title')}
                                        placeholder="Nhập tiêu đề..."
                                        maxLength={80}
                                    />
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                    <div className='row mt-3 align-items-start'>
                        <div className='col-2'>
                            <p className='text-bold'>Mô tả:</p>
                        </div>
                        <div className='col-10'>
                            <Form.Item name="shortDescription">
                                <div className="search-container">
                                    <i className="fa-solid fa-note-sticky"></i>
                                    <input
                                        type="text"
                                        defaultValue={form.getFieldValue('shortDescription')}
                                        placeholder="Nhập mô tả..."
                                        maxLength={130} />
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                    <div className='row mt-3 align-items-start'>
                        <div className='col-2'>
                            <p className='text-bold text-start'>Ảnh bìa:</p>
                        </div>
                        <div className='col-6'>
                            <Form.Item>
                                <div className='image-upload'>
                                    <div className='container'>
                                        <span className='image-cloud'><CloudUploadOutlined /></span>
                                        <div onClick={() => document.getElementById('input-upload').click()}>
                                            <span htmlFor={"input-upload"} className='input-upload'>
                                                Chọn ảnh
                                            </span> đăng tải.
                                        </div>
                                        {uploading && (
                                            <div style={{ marginTop: '20px', width: '100%' }}>
                                                <Progress percent={uploadProgress} status="active" />
                                            </div>
                                        )}
                                        {image && (
                                            <div>
                                                <img src={image} alt="Uploaded" style={{ width: "100%" }} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <input type="file" id='input-upload' hidden={true} onChange={handleImageChange} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-2'>
                            <p className='text-bold'>Nội dung:</p>
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <Form.Item name="markDownContent">
                            <MdEditor style={{
                                minHeight: '500px',
                                borderRadius: '10px',
                                padding: '3px',
                            }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={handleEditorChange} />
                        </Form.Item>
                    </div>
                    <Form.Item name="htmlContent">
                        <input type="hidden" />
                    </Form.Item>
                    <div className='row mt-3'>
                        <div className='button-container'>
                            <button
                                className='button'
                                onClick={() => { handleSave() }}>
                                <i className="fa-solid fa-floppy-disk"></i>
                                Lưu
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default CreateHandbook;