import React, { useContext, useEffect, useState } from 'react';
import headerContext from '../contexts/header/headerContext';
import { FormControl, MenuItem, Select, TextField, Button } from '@mui/material';
import userContext from '../contexts/user/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import alertContext from '../contexts/alert/alertContext';

const EditUser = (props) => {
    const navigate = useNavigate();
    const {setPage} = useContext(headerContext);
    const {setShowAlert} = useContext(alertContext);
    const { singleUser , setSingleUser, getUserById, updateUserInfo } = useContext(userContext);
    const params = useParams();

    useEffect(() => {
        setPage("");
        getUserById(params.id);
    },[])

    const handleChange = (e, param) => {
        setSingleUser({...singleUser, [param]: e.target.value});
        console.log({...singleUser, [param]: e.target.value});
    }

    const handleUpdate = () => {
        updateUserInfo();
        setShowAlert("User Updated Successful");
        navigate('/users');
    }

    return (
        <div className='main'>
            <div className="title">
                <h2 style={{display: 'inline-block', textAlign: 'center', borderBottom: '3px solid tomato', paddingBottom: 25}}>Edit User</h2>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <label className='d-block' htmlFor="firstName">First Name *</label>
                        <TextField id='firstName' value={singleUser.firstName} onChange={(e) => handleChange(e, 'firstName')} fullWidth variant='outlined' size='small'/>        
                    </div>
                    <div className="col-md-6">
                        <label className='d-block' htmlFor="lastName">Last Name *</label>
                        <TextField id='lastName' value={singleUser.lastName} onChange={(e) => handleChange(e, 'lastName')} fullWidth variant='outlined' size='small'/>        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className='d-block mt-3' htmlFor="email">Email Address *</label>
                        <TextField id='email' value={singleUser.email} onChange={(e) => handleChange(e, 'email')} fullWidth variant='outlined' size='small'/>
                    </div>
                    {singleUser.roleId !== 1 &&
                        <div className="col-md-6">
                            <label className='d-block mt-3' htmlFor="role">Role *</label>
                            <FormControl fullWidth>
                                <Select
                                    labelId="role"
                                    id="role"
                                    size='small'
                                    value={singleUser.roleId?singleUser.roleId:''}
                                    onChange={(e) => handleChange(e, 'roleId')}
                                >
                                    <MenuItem value={2}>Seller</MenuItem>
                                    <MenuItem value={3}>Buyer</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    }
                </div>
                <Button className='mt-5 me-3' sx={{bgcolor: '#80bf32', width: 100}} onClick={handleUpdate} color='success' variant="contained">Save</Button>
                <Button className='mt-5' sx={{bgcolor: '#f14d54', width: 100}} onClick={() => navigate('/users')} color='error' variant="contained">Cancel</Button>
            </div>
        </div>
    )
}

export default EditUser;