import { useEffect, useState } from 'react';
import './HandbookItem.scss';
import { getHandbookById } from '@/services/doctorService';
import { useMutation } from '@/hooks/useMutation';
import { convertDateTimeToString } from "@/utils/formatDate";
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { ROLE } from '@/constant/role';
import { STATUS_HOSPITAL } from '@/constant/value';
import { message } from 'antd';
import { updateHandbook } from '@/services/adminService';
import { useSelector } from 'react-redux';
const DetailHandbook = (props) => {
    const navigate = useNavigate();
    let { user } = useSelector((state) => state.authen);
    const [isEditing, setIsEditing] = useState(false);

    const [doctorName, setDoctorName] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");

    const [image, setImage] = useState("");
    const [markDownContent, setMarkDownContent] = useState("");
    const [htmlContent, setHtmlContent] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [isEditing]);

    let {
        data: dataHandbook,
        loading: handbookLoading,
        error: handbookError,
        execute: fetchHandbookData,
    } = useMutation((query) => getHandbookById(+props.id));
    useEffect(() => {
        fetchHandbookData();
    }, [props]);

    useEffect(() => {
        if (dataHandbook && dataHandbook.DT) {
            setDoctorName(`${dataHandbook.DT.handbookStaffData.staffUserData.lastName} ${dataHandbook.DT.handbookStaffData.staffUserData.firstName}`);
            setTitle(dataHandbook.DT.title);
            setTags(dataHandbook.DT.tags ? dataHandbook.DT.tags.split(',') : []);
            setImage(dataHandbook.DT.image);
            setDate(dataHandbook.DT.updatedAt);
            setMarkDownContent(dataHandbook.DT.handbookDescriptionData.markDownContent);
            setHtmlContent(dataHandbook.DT.handbookDescriptionData.htmlContent);
            setDepartmentName(dataHandbook.DT.handbookStaffData.staffDepartmentData.name);
            setDescription(dataHandbook.DT.shortDescription);
        }
    }, [dataHandbook]);
    if (handbookLoading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (handbookError) {
        return <div className="text-center p-4 text-red-500">Error loading handbooks</div>;
    }
    let handleUpdate = async (status) => {
        let response = await updateHandbook({ id: dataHandbook.DT.id, status });
        console.log("res ", response);
        if (response?.EC === 0) {
            message.success(response?.EM || "Thành công");
            navigate(-1);
        }
        else {
            message.error(response?.EM || "Thất bại");
        }
    }
    return (
        <div className="DetailHandbook-container">
            <div className="row text-center">
                <div className="col-12 text-center">
                    <span className="doctor-name">{doctorName}</span>
                    <span>{convertDateTimeToString(date)}</span>
                </div>
            </div>
            <div className="row mt-3 text-center">
                <div className="col-0 col-lg-2" />
                <div className="col-12 col-lg-8">
                    <h1 className='title'>{title}</h1>
                </div>
                <div className="col-0 col-lg-2" />
            </div>
            <div className="row mt-3 text-center">
                <div className="col-2" />
                <div className="col-8">
                    <div className='row text-center'>
                        <div className='list-tag'>
                            {tags.map((value, index) => (
                                <div key={index} className='tag-item'> {/* Unique key */}
                                    <p>{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-2" />
            </div>
            <div className="row mt-3 text-center">
                <p className='description'>{description}</p>
            </div>
            <div className="row mt-3">
                <ReactMarkdown className='markdown-content'>{markDownContent}</ReactMarkdown>
            </div>
            <div className='row mt-3'>
                <div className='button-container text-end'>

                    <button
                        className='btn btn-default'
                        onClick={() => navigate(-1)}
                    >  Đóng </button>
                    {user.role === ROLE.ADMIN && (dataHandbook?.DT?.status === STATUS_HOSPITAL.PENDING.value) &&
                        <>
                            <button
                                className='btn btn-warning ms-2'
                                onClick={() => handleUpdate(STATUS_HOSPITAL.REJECT.value)}
                            >Cần sửa đổi</button>
                            <button
                                className='btn btn-primary ms-2'
                                onClick={() => handleUpdate(STATUS_HOSPITAL.ACTIVE.value)}
                            > Duyệt </button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default DetailHandbook;