import React, { useState } from "react";
import { fetchCategories, getSingleCategory, addCategory, updateCategory, deleteCategory } from '../../API'
import categoryContext from "./categoryContext";

const UserState = ({ children }) => {
    const [singleCategory, setSinglecategory] = useState({});

    const [categories, setCategories] = useState({
        pageIndex: 1,
        pageSize: 5,
        totalItems: 5,
        totalPages: 1
    });

    const [categoryItems, setCategoryItems] = useState([]);

    const getCategories = async(pgIndex, pgSize) => {
        fetchCategories(pgIndex, pgSize, '')
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setCategories({
                        pageIndex: res.data.result.pageIndex,
                        pageSize: res.data.result.pageSize,
                        totalItems: res.data.result.totalItems,
                        totalPages: res.data.result.totalPages
                    })
                    setCategoryItems(userItems.concat(res.data.result.items));
                }else{
                    console.log(res.data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const getUserById = async(id) => {
        getSingleUser(id)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setSingleUser(res.data.result);
                }else{
                    console.log(res.data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const searchUser = async (pgIndex, pgSize, search) => {
        fetchUsers(pgIndex, pgSize, search)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setUsers({
                        pageIndex: res.data.result.pageIndex,
                        pageSize: res.data.result.pageSize,
                        totalItems: res.data.result.totalItems,
                        totalPages: res.data.result.totalPages
                    })
                    if(pgIndex == 1) {
                        setUserItems(res.data.result.items);
                        console.log(res.data.result.items);
                    }else{
                        setUserItems(userItems.concat(res.data.result.items));
                        console.log(userItems.concat(res.data.result.items));
                    }
                }else{
                    console.log(res.data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const updateUserInfo = () => {
        // remove __v and _id
        const { _id, __v, ...restUserData } = singleUser;
        updateUser(restUserData)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    console.log("Data Updated");
                }else{
                    console.log(res.data);
                }
            })
            .catch(error => console.log(error));
    }

    const deleteUserInfo = (id, perPage, searchParam) => {
        deleteUser(id)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    console.log("Data Deleted");
                    setUserItems([]);
                    searchUser(1, perPage, searchParam);
                }else{
                    console.log(res.data);
                }
            }).catch(error => console.log(error));
    }

    return (
        <categoryContext.Provider value={{user, users, userItems, setUser, getUsers, searchUser, setUserItems, singleUser, setSingleUser, getUserById, updateUserInfo, deleteUserInfo}}>
            { children }
        </categoryContext.Provider>
    );
}

export default UserState;