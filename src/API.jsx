export const localBackEndURL = "https://book-e-sell-node-api.vercel.app/api/"

export const apiURL = process.env.NODE_ENV === 'production' ?
    'https://uniquetechnology.ml/Project_Backend/' : localBackEndURL

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: apiURL,
    timeout: 12400000,
    responseType: 'json'
});

// Users
export function authUser(data) {
    return axiosInstance.post(`user/login`, data);
}

export function createUser(data) {
    return axiosInstance.post(`user`, data);
}

export function fetchUsers(pgIndex, pgSize, search) {
    if(search !== '') {
        return axiosInstance.get(`user?pageIndex=${pgIndex}&pageSize=${pgSize}&keyword=${search}`);
    }
    return axiosInstance.get(`user?pageIndex=${pgIndex}&pageSize=${pgSize}`);
}

export function getSingleUser(id) {
    return axiosInstance.get(`user/byId?id=${id}`);
}

export function updateUser(data) {
    return axiosInstance.put(`user`, data);
}

export function deleteUser(id) {
    return axiosInstance.delete(`user?id=${id}`);
}

// Categories
export function fetchCategories(pgIndex, pgSize, search) {
    if(search !== '') {
        return axiosInstance.get(`category?pageIndex=${pgIndex}&pageSize=${pgSize}&keyword=${search}`);
    }
    return axiosInstance.get(`category?pageIndex=${pgIndex}&pageSize=${pgSize}`);
}

export function getSingleCategory(id) {
    return axiosInstance.get(`category/byId?id=${id}`);
}

export function addCategory(data) {
    return axiosInstance.post(`category`, data);
}

export function updateCategory(data) {
    return axiosInstance.put(`category`, data);
}

export function deleteCategory(id) {
    return axiosInstance.delete(`category?id=${id}`);
}


export function saveInquiry(data) {
    return axiosInstance.post("Inquiry-Entry.php", data);
}

export function InquiryList(data) {
    return axiosInstance.post("Inquiry-List.php", data);
}

export function LoadInquiryInfo(data) {
    return axiosInstance.post("LoadInquiryInfo.php", data);
}

export function LoadBrands(data) {
    return axiosInstance.post("LoadBrands.php", data);
}

export function LoadModels(data) {
    return axiosInstance.post("LoadModels.php", data);
}

export function LoadProbs(data) {
    return axiosInstance.post("LoadProbs.php", data);
}

export function LoadAppCostTimeType(data) {
    return axiosInstance.post("LoadAppCostTimeType.php", data);
}

export function checkLogin(data) {
    return axiosInstance.post("Login.php", data);
}

export function getLocation(data) {
    return axiosInstance.post("Location.php", data);
}

export function fetchServices(data) {
    return axiosInstance.post("services.php", data);
}
