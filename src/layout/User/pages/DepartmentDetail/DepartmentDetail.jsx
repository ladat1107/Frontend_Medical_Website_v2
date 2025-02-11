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
        execute: getDepartmentDetail,
    } = useMutation(() => userService.getDepartmentId({ id }));
    const department = departmentData?.DT || {};
    useEffect(() => {
        if (id) {
            getDepartmentDetail();
        }
    }, [location]);
    useEffect(() => {
        if (departmentData) {
            setListStaff(departmentData.DT.staffDepartmentData);
        }
    }, [departmentData]);
    // let fetchDepartmentList = async () => {
    //     let response = await userService.getDepartment({ tags: departmentData.DT.tags, limit: 20 });
    //     if (response.EC === 0) {
    //         setListDepartment(response.DT);
    //     }
    // }
    return (
        <div className={'bg'} >
            {department && listStaff &&
                <Container>
                    <div className="department-detail-user">
                        <DepartmentDetailHeader departmentDetail={department} />
                        <DepartmentRelated listStaff={listStaff} />
                    </div>
                </Container>
            }

        </div>
    )
}

export default DepartmentDetail;