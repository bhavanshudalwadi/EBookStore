import React, { useContext, useEffect, useState } from 'react';
import headerContext from '../contexts/header/headerContext';
import { FormControl, MenuItem, Select, TextField, Button } from '@mui/material';
import userContext from '../contexts/user/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";

const EditUser = () => {
    const navigate = useNavigate();
    const {setPage} = useContext(headerContext);
    const { singleUser , setSingleUser, getUserById, updateUserInfo } = useContext(userContext);
    const params = useParams();

    const [initialValues, setInitialValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        roleId: ""
    });

    const validate = Yup.object().shape({
        firstName: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("FirstName is Required"),
        lastName: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("LastName is Required"),
        email: Yup.string().email("Invalid email").required("Email is Required"),
        roleId: Yup.number().required("Role is required")
    });

    useEffect(() => {
        setPage("");
        if(params.id){
            getUserById(params.id);
        }
        return (() => { setSingleUser({}); setInitialValues({}); })
    },[])

    useEffect(() => {
        delete singleUser._id;
        delete singleUser.__v;
        setInitialValues(singleUser);
    }, [singleUser])

    const handleUpdate = (values) => {
        console.log(values)
        updateUserInfo(values, '/users');
    }

    return (
        <div className='main'>
            <div className="title">
                <h2 style={{display: 'inline-block', textAlign: 'center', borderBottom: '3px solid tomato', paddingBottom: 25}}>Edit User</h2>
            </div>
            <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={handleUpdate}
                enableReinitialize={true}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <label className='d-block' htmlFor="firstName">First Name *</label>
                                <TextField id='firstName' name='firstName' onChange={handleChange} onBlur={handleBlur} value={values.firstName} error={errors.firstName && touched.firstName} helperText={errors.firstName && touched.firstName?errors.firstName:''} fullWidth variant='outlined' size='small'/>        
                            </div>
                            <div className="col-md-6">
                                <label className='d-block' htmlFor="lastName">Last Name *</label>
                                <TextField id='lastName' name='lastName' onChange={handleChange} onBlur={handleBlur} value={values.lastName} error={errors.lastName && touched.lastName} helperText={errors.lastName && touched.lastName?errors.lastName:''} fullWidth variant='outlined' size='small'/>        
                            </div>
                            <div className="col-md-6">
                                <label className='d-block mt-3' htmlFor="email">Email Address *</label>
                                <TextField id='email' name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} error={errors.email && touched.email} helperText={errors.email && touched.email?errors.email:''} fullWidth variant='outlined' size='small'/>
                            </div>
                            {values.roleId && values.roleId !== 1 ?
                                <div className="col-md-6">
                                    <label className='d-block mt-3' htmlFor="roleId">Role *</label>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="roleId"
                                            id="roleId"
                                            name='roleId'
                                            size='small'
                                            sx={{'.MuiSelect-nativeInput': {borderRadius: '1px'}}}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.roleId}
                                            error={errors.roleId && touched.roleId}
                                        >
                                            <MenuItem value={3}>Buyer</MenuItem>
                                            <MenuItem value={2}>Seller</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div className='text-danger badge fw-normal ps-3'>
                                        {errors.roleId && touched.roleId?errors.roleId:''}
                                    </div>
                                </div>
                                :<></>
                            }
                        </div>
                        <Button className='mt-5 me-3' type='submit' sx={{bgcolor: '#80bf32', width: 100}} color='success' variant="contained">Save</Button>
                        <Button className='mt-5' sx={{bgcolor: '#f14d54', width: 100}} onClick={() => navigate('/users')} color='error' variant="contained">Cancel</Button>
                    </form>
                )}
            </Formik>
            </div>
        </div>
    )
}

export default EditUser;