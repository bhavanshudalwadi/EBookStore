import React, { useContext, useState } from "react";
import userContext from "./userContext";
import { fetchUsers, getSingleUser, updateUser, deleteUser, authUser, createUser } from '../../API';
import alertContext from "../alert/alertContext";
import { useNavigate } from "react-router-dom";

const UserState = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null);
    const [singleUser, setSingleUser] = useState({});
    const [users, setUsers] = useState({
        pageIndex: 1,
        pageSize: 5,
        totalItems: 5,
        totalPages: 1
    });
    const [userItems, setUserItems] = useState([]);

    const { setShowAlert, setShowProgress } = useContext(alertContext);
    const navigate = useNavigate();

    const userLogin = async (data) => {
        setShowProgress(true);
        authUser(data)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    delete res.data.result._id;
                    delete res.data.result.__v;
                    localStorage.setItem('user', JSON.stringify(res.data.result));
                    setUser(res.data.result);
                    setShowProgress(false);
                    setShowAlert("Welcome Back "+res.data.result.firstName);
                    navigate('/');
                }else{
                    console.log(res.data);
                    setShowProgress(false);
                    setShowAlert(res.data.error?res.data.error:'Login Failed');
                }
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Login Failed');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Login Failed');
                }
            })
    }

    const registerUser = async(data) => {
        setShowProgress(true);
        createUser(data)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setShowAlert("Registration Successful");
                    navigate('/login');
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Registration Failed');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Registration Failed');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Registration Failed');
                }
            })
    }

    const getUserById = async(id) => {
        setShowProgress(true);
        getSingleUser(id)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setSingleUser(res.data.result);
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

    const searchUser = async (pgIndex, pgSize, search) => {
        setShowProgress(true);
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

    const updateUserInfo = (data, redirect) => {
        setShowProgress(true);
        updateUser(data)
            .then(res => {
                setShowProgress(false);
                if(res.data.key === "SUCCESS") {
                    setShowAlert('User Updated Successfully');
                    navigate(redirect);
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'User Not Updated');
                }
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'User Not Updated');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'User Not Updated');
                }
            });
    }

    const deleteUserInfo = (id, perPage, searchParam) => {
        setShowProgress(true);
        deleteUser(id)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    console.log("Data Deleted");
                    setUserItems([]);
                    searchUser(1, perPage, searchParam);
                    setShowAlert('User Deleted Successfully');
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'User Not Deleted');
                }
                setShowProgress(false);
            }).catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'User Not Deleted');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'User Not Deleted');
                }
            });
    }

    return (
        <userContext.Provider value={{user, users, userItems, setUser, searchUser, userLogin, registerUser, setUserItems, singleUser, setSingleUser, getUserById, updateUserInfo, deleteUserInfo}}>
            { children }
        </userContext.Provider>
    );
}

export default UserState;