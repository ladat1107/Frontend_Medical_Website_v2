import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'https://api.nosomovo.xyz/',
    withCredentials: false,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        console.log("error", error);
        return Promise.reject(error);
    }
);
const convert = (id) => {
    if (Number(id) < 10) {
        return `0${id}`
    }
    return id
}
export const apiService = {
    // getAllFolk() {
    //     return axiosInstance.get(`https://api.nosomovo.xyz/ethnic/getalllist/`)
    // },
    // getAllProvince() {
    //     return axiosInstance.get(`/province/getalllist/193`)
    // },
    // getDistrictByProvinceId(id) {
    //     return axiosInstance.get(`/district/getalllist/${id}`)
    // },
    // getWardByDistrictId(id) {
    //     return axiosInstance.get(`/commune/getalllist/${id}`)
    // },
    getAllProvince() {
        return axiosInstance.get(`https://esgoo.net/api-tinhthanh/1/0.htm`)
    },
    getDistrictByProvinceId(id) {
        return axiosInstance.get(`https://esgoo.net/api-tinhthanh/2/${convert(id)}.htm`)
    },
    getWardByDistrictId(id) {
        return axiosInstance.get(`https://esgoo.net/api-tinhthanh/3/${convert(id)}.htm`)
    },
    getFullAddress(id) {
        return axiosInstance.get(`https://esgoo.net/api-tinhthanh/5/${convert(id)}.htm`)
    }
}