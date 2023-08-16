import React, { useContext, useState } from "react";
import { fetchCategories, getSingleCategory, addCategory, updateCategory, deleteCategory, fetchAllCategories } from '../../API'
import categoryContext from "./categoryContext";
import { useNavigate } from "react-router-dom";
import alertContext from "../alert/alertContext";

const CategoryState = ({ children }) => {
    const [singleCategory, setSingleCategory] = useState({});
    const [categoryDetails, setCategoryDetails] = useState({});
    const [categories, setCategories] = useState([]);

    const { setShowAlert, setShowProgress } = useContext(alertContext);
    const navigate = useNavigate();

    const getAllCategories = async() => {
        setShowProgress(true);
        fetchAllCategories()
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setCategories(res.data.result);
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Server Error');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Server Error');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Server Error');
                }
            })
    }

    const createCategory = async(data) => {
        setShowProgress(true);
        addCategory(data)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    console.log("New Category Added");
                    setShowAlert("New Category Added");
                    navigate('/categories');
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Category Not Added');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Category Not Added');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Category Not Added');
                }
            })
    }

    const getCategoryById = async(id) => {
        setShowProgress(true);
        getSingleCategory(id)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setSingleCategory(res.data.result);
                    console.log(res.data.result);
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Server Error');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Server Error');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Server Error');
                }
            })
    }

    const getCategories = async (pgIndex, pgSize, search) => {
        setShowProgress(true);
        fetchCategories(pgIndex, pgSize, search)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setCategoryDetails({
                        pageIndex: res.data.result.pageIndex,
                        pageSize: res.data.result.pageSize,
                        totalItems: res.data.result.totalItems,
                        totalPages: res.data.result.totalPages
                    })
                    if(pgIndex == 1) {
                        setCategories(res.data.result.items);
                        console.log(res.data.result.items);
                    }else{
                        setCategories(categories.concat(res.data.result.items));
                        console.log(categories.concat(res.data.result.items));
                    }
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Server Error');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Server Error');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Server Error');
                }
            })
    }

    const updateCategoryInfo = (data) => {
        setShowProgress(true);
        updateCategory(data)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    console.log("Category Updated");
                    setShowAlert('Category Updated Sucessfully');
                    navigate('/categories');
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Category Not Updated');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Category Not Updated');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Category Not Updated');
                }
            });
    }

    const deleteCategoryInfo = (id, perPage, searchParam) => {
        setShowProgress(true);
        deleteCategory(id)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setShowAlert('Category Deleted Sucessfully');
                    setCategories([]);
                    getCategories(1, perPage, searchParam);
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Category Not Deleted');
                }
                setShowProgress(false);
            }).catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Category Not Deleted');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Category Not Deleted');
                }
            });
    }

    return (
        <categoryContext.Provider value={{categories, setCategories, categoryDetails, setCategoryDetails, getAllCategories, singleCategory, setSingleCategory, createCategory, getCategoryById, getCategories, updateCategoryInfo, deleteCategoryInfo}}>
            { children }
        </categoryContext.Provider>
    );
}

export default CategoryState;