import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllExaminationsAdmin, getExaminationByIdAdmin } from "../services/adminService";
import { useSelector } from "react-redux";
import { ROLE } from "@/constant/role";

export const useGetExamination = () => {
    const { user } = useSelector(state => state.authen);
    return useQuery({
        queryKey: ['examinations'],
        queryFn: () => getAllExaminationsAdmin(),
        enabled: user?.role === ROLE.ADMIN,
        placeholderData: keepPreviousData,
    })
}

export const useGetExaminationById = (id) => {
    const { user } = useSelector(state => state.authen);
    return useQuery({
        queryKey: ['examination', id],
        queryFn: () => getExaminationByIdAdmin(id),
        enabled: user?.role === ROLE.ADMIN,
    })
}