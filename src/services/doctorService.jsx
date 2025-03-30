import axios from "@/utils/axiosInstance";

export const getUserByCid = (cid) => {
    return axios.get(`/api/getUserByCid?cid=${cid}`)
}

export const getUserById = (id) => {
    return axios.get(`/api/getUserById?id=${id}`)
}
// Examination
export const getExaminations = async (date, toDate, status, staffId, is_appointment, page, limit, search, time) => {
    return axios.get(`/api/getExaminations?date=${date}&toDate=${toDate}&status=${status}&staffId=${staffId || ''}&is_appointment=${is_appointment}&page=${+page}&limit=${+limit}&search=${search}&time=${time || ''}`);
}

export const getListToPay = async (date, statusPay, page, limit, search) => {
    return axios.get(`/api/getListToPay?date=${date}&statusPay=${statusPay}&page=${+page}&limit=${+limit}&search=${search}`);
}

export const getExaminationById = (id) => {
    return axios.get(`/api/getExaminationById?id=${id}`)
}

export const createExamination = async (data) => {
    return axios.post(`/api/createExamination`, data);
};

export const getPatienSteps = async (examinationId) => {
    return axios.get(`/api/getPatienSteps?examId=${examinationId}`);
}

export const updateExamination = async (data) => {
    return axios.put(`/api/updateExamination`, data);
};

export const checkOutParaclinical = (data) => {
    return axios.post(`/api/paymentParaclinicalMomo`, data);
}
export const checkOutExamination = (data) => {
    return axios.post(`/api/paymentExaminationMomo`, data);
}
export const checkOutPrescription = (data) => {
    return axios.post(`/api/paymentPrescriptionMomo`, data);
}

export const getDiseaseByName = (name) => {
    return axios.get(`/api/getDiseaseByName?name=${name}`)
}

export const getAllDisease = () => {
    return axios.get(`/api/getAllDisease`)
}

export const getAllRoomTypes = () => {
    return axios.get(`/api/getAllServiceTypes`)
}

export const getServiceLaboratory = () => {
    return axios.get(`/api/getServiceLaboratory`)
}


export const getAllMedicinesForExam = () => {
    return axios.get(`/api/getAllMedicinesForExam`)
}

export const getStaffNameById = (doctorId) => {
    return axios.get(`/api/getStaffNameById?staffId=${doctorId}`);
}

//vital sign
export const createOrUpdateVitalSign = async (data) => {
    return axios.post(`/api/createOrUpdateVitalSign`, data);
}

//Paraclinical
export const createOrUpdateParaclinical = async (data) => {
    return axios.post(`/api/createOrUpdateParaclinical`, data);
}

export const createRequestParaclinical = async (data) => {
    return axios.post(`/api/createRequestParaclinical`, data);
}

export const deleteParaclinical = async (data) => {
    return axios.delete(`/api/deleteParaclinical`, {
        params: {
            id: data.id,
            examinationId: data.examinationId
        }
    });
}

export const updateParaclinical = async (data) => {
    return axios.put(`/api/updateParaclinical`, data);
}

export const getParaclinicals = async (date, status, staffId, page, limit, search) => {
    return axios.get(`/api/getParaclinicals?date=${date}&status=${status}&staffId=${staffId}&page=${+page}&limit=${+limit}&search=${search}`);
}

export const getPrescriptions = async (date, status, staffId, page, limit, search) => {
    return axios.get(`/api/getPrescriptions?date=${date}&status=${status}&staffId=${staffId}&page=${+page}&limit=${+limit}&search=${search}`);
}

export const updatePrescription = async (data) => {
    return axios.put(`/api/updatePrescription`, data);
}

export const getMedicalHistories = async (userId = "") => {
    return axios.get(`/api/getMedicalHistories?userId=${userId}`);
}

//Prescription
export const getPrescriptionByExaminationId = async (examinationId) => {
    return axios.get(`/api/getPrescriptionByExaminationId?examinationId=${examinationId}`)
}

export const updateListPayParaclinicals = async (data) => {
    return axios.put(`/api/updateListPayParaclinicals`, data);
}

export const upsertPrescription = async (data) => {
    return axios.post(`/api/upsertPrescription`, data);
}

//Hand book
export const getAllHandbooks = async (page, limit, search, filter, status) => {
    return axios.get(`/api/getAllHandBooks?page=${page}&limit=${limit}&search=${search}&filter=${filter}&status=${status}`);
}

export const getHandbookById = async (id) => {
    return axios.get(`/api/getHandBookById?id=${id}`);
}

export const createHandbook = async (data) => {
    return axios.post(`/api/createHandBook`, data);
}

export const updateHandbook = async (data) => {
    return axios.put(`/api/updateHandBook`, data);
}
export const getAllTags = async () => {
    return axios.get(`/api/getAllTags`);
}

export const getScheduleByStaffId = async (staffId) => {
    return axios.get(`/api/getScheduleByStaffId?staffId=${staffId}`);
}

//specialty
export const getSpecialties = async () => {
    return axios.get(`/api/getSpecialtiesByDepartment`);
}

//insuarance
export const getUserInsuarance = async (userId) => {
    return axios.get(`/api/getUserInsuarance?userId=${userId}`);
}

export const getAllUserToNotify = async () => {
    return axios.get(`/api/getAllUserToNotify`);
}

export const getAllNotification = async (page, limit, search) => {
    page = page || 1;
    limit = limit || 10;
    search = search || '';
    return axios.get(`/api/getAllNotifications?page=${page}&limit=${limit}&search=${search}`);
}

export const createNotification = async (data) => {
    return axios.post(`/api/createNotification`, data);
}

export const updateNotification = async (data) => {
    return axios.put(`/api/updateNotification`, data);
}

export const markAllRead = async (data) => {
    return axios.put(`/api/markAllRead`, data);
}

export const sendNotification = (title, htmlDescription, firstName, lastName, date, attachedFiles, receiverIds) => {
    const response = axios.post('/api/send-notification', {
        title, 
        htmlDescription, 
        firstName, 
        lastName, 
        date, attachedFiles, receiverIds});
    return response.data;
};