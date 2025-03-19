import Container from "@/components/Container";
import "./DepartmentDetail.scss";
import DepartmentRelated from "./section/DepartmentRelated";
import DepartmentDetailHeader from "./section/DepartmentDetailHeader";
import userService from "@/services/userService";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@/hooks/useMutation";

const DepartmentDetail = () => {
    let { id } = useParams();
    let location = useLocation();
    let [listStaff, setListStaff] = useState([]);
    const {
        data: departmentData,
        loading: departmentLoading,
        execute: getDepartmentDetail,
    } = useMutation(() => userService.getDepartmentId({ id }));
    const department = departmentData?.DT || {};
    useEffect(() => {
        if (id) {
            getDepartmentDetail();
        }
    }, [location]);
    useEffect(() => {
        window.scrollTo(0, 0);
        if (departmentData) {
            setListStaff(departmentData.DT.staffDepartmentData);
        }
    }, [departmentData]);

    return (
        <div className={'bg'} >
            <Container>
                <div className="department-detail-user">
                    <DepartmentDetailHeader departmentLoading={departmentLoading} departmentDetail={department} />
                    {listStaff && <DepartmentRelated listStaff={listStaff} />}
                </div>
            </Container>

        </div>
    )
}

export default DepartmentDetail;