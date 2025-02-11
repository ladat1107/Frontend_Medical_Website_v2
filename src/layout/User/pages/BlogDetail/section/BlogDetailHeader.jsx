import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../BlogDetail.scss";
import { faCalendarMinus } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "@/utils/formatDate";

const BlogDetailHeader = (props) => {
    let { blogDetail } = props;
    return (
        <div className="blog-detail-user-header">
            <div className="imghead">
                <img src={"https://cdn.medpro.vn/prod-partner/a9257277-bd0a-4183-8ed2-462ce5b6a619-baby-dino_1180x250_desktop.webp?w=1200&q=75"} alt="" />
            </div>
            <div className="blog-detail-user-content row">
                <div className="content-handbook col-9">
                    <h1 className="article-title">
                        {blogDetail?.title}
                    </h1>
                    <div className="article-meta">
                        <FontAwesomeIcon className="me-3" icon={faCalendarMinus} />
                        <span className="article-date">{formatDate(blogDetail?.updatedAt)}</span>
                        <span className="article-author"> - {blogDetail?.handbookStaffData?.position}. {blogDetail?.handbookStaffData?.staffUserData?.lastName + " " + blogDetail?.handbookStaffData?.staffUserData?.firstName}</span>
                    </div>
                    <div className="article-intro">
                        {blogDetail?.shortDescription}
                    </div>
                    <div className="article-content mt-4">
                        <div lassName="article-content" dangerouslySetInnerHTML={{ __html: blogDetail?.handbookDescriptionData?.htmlContent || "" }}></div>
                    </div>
                </div>
                <div className="col-3 image-ri">
                    <img src={"https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbn.da13f84b.png&w=1920&q=75"} />
                </div>
            </div>
        </div>
    )
}

export default BlogDetailHeader;