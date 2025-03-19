import { useEffect, useState } from 'react';
import './HandbookItem.scss';
import { getHandbookById } from '@/services/doctorService';
import { useMutation } from '@/hooks/useMutation';
import { convertDateTimeToString } from "@/utils/formatDate";
import { useNavigate } from 'react-router-dom';
import { ROLE } from '@/constant/role';
import { STATUS_HOSPITAL } from '@/constant/value';
import { message, Skeleton } from 'antd';
import { updateHandbook } from '@/services/adminService';
import { useSelector } from 'react-redux';
import ParseHtml from '../ParseHtml';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const DetailHandbook = (props) => {
    const navigate = useNavigate();
    let [isLoadingAction, setIsLoadingAction] = useState(null);
    let { user } = useSelector((state) => state.authen);
    const [handbookDetail, setHandbookDetail] = useState({});
    const [tags, setTags] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
        if (dataHandbook && dataHandbook.EC === 0) {
            setHandbookDetail(dataHandbook.DT);
            setTags(dataHandbook.DT.tags ? dataHandbook.DT.tags.split(',') : []);
        }
    }, [dataHandbook]);

    if (handbookError) {
        return <div className="text-center p-4 text-red-500">Error loading handbooks</div>;
    }
    let handleUpdate = async (status) => {
        try {
            setIsLoadingAction(status);
            let response = await updateHandbook({ id: dataHandbook.DT.id, status });
            if (response?.EC === 0) {
                message.success(response?.EM || "Thành công");
                navigate(-1);
            }
            else {
                message.error(response?.EM || "Thất bại");
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoadingAction(null);
        }
    }
    return (
        <div className="DetailHandbook-container">
            <div className="row text-center">
                {handbookLoading ? <Skeleton active /> : <div className="col-12 text-center">
                    <span className="doctor-name">{handbookDetail?.handbookStaffData?.staffUserData?.lastName || ""} {handbookDetail?.handbookStaffData?.staffUserData?.firstName || ""}</span>
                    <span>{convertDateTimeToString(handbookDetail?.updatedAt || "")}</span>
                </div>}
            </div>
            <div className="row mt-3 text-center">
                <div className="col-0 col-lg-2" />
                <div className="col-12 col-lg-8">
                    {handbookLoading ? <Skeleton.Input active /> : <h2>{handbookDetail?.title || ""}</h2>}
                </div>
                <div className="col-0 col-lg-2" />
            </div>
            <div className="row mt-3 text-center">
                <div className="col-2" />
                <div className="col-8">
                    <div className='row text-center'>
                        {handbookLoading ? <Skeleton active /> : <div className='list-tag'>
                            {tags.map((value, index) => (
                                <div key={index} className='tag-item'> {/* Unique key */}
                                    <p>{value}</p>
                                </div>
                            ))}
                        </div>}
                    </div>
                </div>
                <div className="col-2" />
            </div>
            <div className="row mt-3 text-center">
                {handbookLoading ? <Skeleton.Input active /> : <p className='description'>{handbookDetail?.shortDescription || ""}</p>}
            </div>
            <div className="row mt-3">
                {/* <ReactMarkdown className='markdown-content'>{markDownContent}</ReactMarkdown> */}
                {handbookLoading ? <Skeleton.Input active /> : <ParseHtml htmlString={handbookDetail?.htmlDescription || ""} />}
            </div>
            <div className='row mt-3'>
                {handbookLoading ? <Skeleton.Button active style={{ width: "100%" }} /> :
                    <div className='button-container text-end'>
                        <button className='btn btn-default' onClick={() => navigate(-1)}>  Đóng</button>
                        {user.role === ROLE.ADMIN && (handbookDetail?.status === STATUS_HOSPITAL.PENDING.value) &&
                            <>
                                <button
                                    disabled={isLoadingAction}
                                    className='btn btn-warning ms-2'
                                    onClick={() => handleUpdate(STATUS_HOSPITAL.REJECT.value)}
                                >{isLoadingAction === STATUS_HOSPITAL.REJECT.value && <FontAwesomeIcon icon={faSpinner} spinPulse />} Cần sửa đổi</button>
                                <button
                                    disabled={isLoadingAction}
                                    className='btn btn-primary ms-2'
                                    onClick={() => handleUpdate(STATUS_HOSPITAL.ACTIVE.value)}
                                >{isLoadingAction === STATUS_HOSPITAL.ACTIVE.value && <FontAwesomeIcon icon={faSpinner} spinPulse />} Duyệt </button>
                            </>
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default DetailHandbook;