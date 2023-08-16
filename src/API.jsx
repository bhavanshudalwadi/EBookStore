export const localBackEndURL = "https://book-e-sell-node-api.vercel.app/api/"

export const apiURL = process.env.NODE_ENV === 'production' ?
    'https://book-e-sell-node-api.vercel.app/api/' : localBackEndURL

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
    if(search.trim() !== '') {
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
export function fetchAllCategories() {
    return axiosInstance.get(`category/all`);
}

export function fetchCategories(pgIndex, pgSize, search) {
    if(search.trim() !== '') {
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

// Books
export function globleBookSearch(search) {
    if(search.trim() !== '') {
        return axiosInstance.get(`book/search?keyword=${search}`);
    }
}

export function fetchBooks(pgIndex, pgSize, search) {
    if(search.trim() !== '') {
        return axiosInstance.get(`book?pageIndex=${pgIndex}&pageSize=${pgSize}&keyword=${search}`);
    }
    return axiosInstance.get(`book?pageIndex=${pgIndex}&pageSize=${pgSize}`);
}

export function getSingleBook(id) {
    return axiosInstance.get(`book/byId?id=${id}`);
}

export function addBook(data) {
    return axiosInstance.post(`book`, data);
}

export function updateBook(data) {
    return axiosInstance.put(`book`, data);
}

export function deleteBook(id) {
    return axiosInstance.delete(`book?id=${id}`);
}

// Cart
export function fetchCartItems(id) {
    return axiosInstance.get(`cart?userId=${id}`);
}

export function addToCart(data) {
    return axiosInstance.post(`cart`, data);
}

export function updateCart(data) {
    return axiosInstance.put(`cart`, data);
}

export function removeCart(id) {
    return axiosInstance.delete(`cart?id=${id}`);
}

// Place Order
export function placeOrder(data) {
    return axiosInstance.post(`order`, data);
}
