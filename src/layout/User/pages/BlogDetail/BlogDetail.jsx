import Container from "@/components/Container";
import "./BlogDetail.scss";
import BlogRelated from "./section/BlogRelated";
import BlogDetailHeader from "./section/BlogDetailHeader";
import userService from "@/services/userService";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@/hooks/useMutation";

const BlogDetail = () => {
    let { id } = useParams();
    let location = useLocation();
    let [listHandbook, setListHandbook] = useState([]);
    const {
        data: handbookData,
        execute: getHandbookDetail,
    } = useMutation(() => userService.getHandbookDetail({ id }));
    const handbook = handbookData?.DT || {};
    useEffect(() => {
        if (id) {
            getHandbookDetail();
        }
    }, [location]);
    useEffect(() => {
        if (handbookData) {
            fetchHandbookList();
        }
    }, [handbookData]);
    let fetchHandbookList = async () => {
        let response = await userService.getHandbook({ tags: handbookData.DT.tags, limit: 20 });
        if (response.EC === 0) {
            setListHandbook(response.DT);
        }
    }
    return (
        <div className={'bg-white'} >
            {handbook && listHandbook &&
                <Container>
                    <div className="blog-detail-user">
                        <BlogDetailHeader blogDetail={handbook} />
                        <BlogRelated listHandbook={listHandbook} />
                    </div>
                </Container>
            }

        </div>
    )
}

export default BlogDetail;