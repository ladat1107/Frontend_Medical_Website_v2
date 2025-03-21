import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../DepartmentDetail.scss";
import { faCalendarMinus, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Rate, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { PATHS } from "@/constant/path";
import SliderComponent from "../../Home/HomeComponent/Slider";
import GoogleMap from "./MapComponent";
import ParseHtml from "@/components/ParseHtml";
const listAdvertisement1 = [
    "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F42a394bd-0354-4c1c-b83b-f6cc331d3263-m3.png&w=1920&q=75",
    "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F42a394bd-0354-4c1c-b83b-f6cc331d3263-m3.png&w=1920&q=75",
    "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F42a394bd-0354-4c1c-b83b-f6cc331d3263-m3.png&w=1920&q=75",
    "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F42a394bd-0354-4c1c-b83b-f6cc331d3263-m3.png&w=1920&q=75",
]

const DepartmentDetailHeader = (props) => {
    let { departmentDetail, departmentLoading } = props;
    const breadcrumbItems = [
        {
            title: <Link to={PATHS.HOME.HOMEPAGE}>Trang chủ</Link>,
        },
        {
            title: <Link to={PATHS.HOME.DEPARTMENT_LIST} >Khoa</Link>,
        },
        {
            title: (<div>Khoa {departmentDetail.name}</div>), // Mục cuối không dùng Link
            className: "breadcrumb-last", // Gắn class tùy chỉnh cho item cuối
        },
    ];
    return (
        <>
            <Breadcrumb items={breadcrumbItems} className="custom-breadcrumb" />
            <div className="department-detail-user-header row">
                <div className="col-3">
                    <div className="hospital-info">
                        {departmentLoading ? <Skeleton.Avatar shape="circle" active style={{ width: "150px", height: "150px", margin: "5px auto" }} /> :
                            <div className="img-star">
                                <img src={departmentDetail?.image || ""} alt="" />
                                <div >
                                    <span>(4) </span> <Rate disabled allowHalf defaultValue={4} />
                                </div>
                            </div>}
                        {departmentLoading ? <Skeleton active paragraph={{ rows: 4 }} /> :
                            <div className="text-location px-3">
                                <div>
                                    <FontAwesomeIcon className="icon" icon={faLocationDot} />
                                    <span> Cơ sở 215 Hồng Bàng, Phường 11, Quận 5, TP.HCM - {departmentDetail?.address}</span>
                                </div>
                                {/* <div>
                            <FontAwesomeIcon className="icon" icon={faClock} />
                            <span>Thứ 2 - Thứ 7 (6:30 - 19:00)</span>
                        </div> */}
                                <div>
                                    <FontAwesomeIcon className="icon" icon={faPhone} />
                                    <span>0353366459</span>
                                </div>
                                <div className="btn-booking">Đặt khám ngay</div>
                            </div>}
                    </div>
                    {!departmentLoading &&
                        <div className="image-ri">
                            <img src={departmentDetail?.deanDepartmentData?.staffUserData?.avatar || "https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbn.da13f84b.png&w=1920&q=75"} />
                            <div> <span className="article-date">Trưởng khoa</span>
                                <span className="article-author"> - {departmentDetail?.deanDepartmentData?.position}. {departmentDetail?.deanDepartmentData?.staffUserData?.lastName + " " + departmentDetail?.deanDepartmentData?.staffUserData?.firstName}</span></div>

                        </div>}
                    {!departmentLoading && <div className="map-deparment">
                        <GoogleMap />
                    </div>}
                </div>

                <div className="department-detail-user-content col-9">
                    <div className="slide-department w-100">
                        {departmentLoading ? <Skeleton.Input active style={{ marginBottom: "50px", height: "320px", width: "100%", borderRadius: "15px", marginTop: "20px" }} /> :
                            <SliderComponent
                                type="advertisement"
                                numberShow={1}
                                autoplayProps={true}
                                dot={false}
                                listData={listAdvertisement1}
                            />}
                    </div>
                    <div className="content-handbook w-100">
                        {departmentLoading ? <Skeleton active style={{ width: "100%", height: "300px", }} className="my-3" /> :
                            <>
                                <h1 className="article-title">
                                    {departmentDetail?.name}
                                </h1>
                                <div className="article-meta">
                                    <FontAwesomeIcon className="me-3" icon={faCalendarMinus} />
                                    <span className="article-date">Trưởng khoa</span>
                                    <span className="article-author"> - {departmentDetail?.deanDepartmentData?.position}. {departmentDetail?.deanDepartmentData?.staffUserData?.lastName + " " + departmentDetail?.deanDepartmentData?.staffUserData?.firstName}</span>
                                </div>
                                <div className="article-intro">
                                    {departmentDetail?.shortDescription}
                                </div>
                            </>}
                    </div>
                    <div className="article-content mt-4 w-100">
                        {departmentLoading ? <Skeleton active style={{ width: "100%", height: "300px" }} className="my-3" /> : <ParseHtml htmlString={departmentDetail?.htmlDescription || ""} />}
                    </div>
                </div>
            </div >
        </>
    )
}

export default DepartmentDetailHeader;