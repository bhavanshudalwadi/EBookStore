import React, { useContext, useEffect, useState } from 'react';
import headerContext from '../contexts/header/headerContext';
import { TextField, Button } from '@mui/material';
import userContext from '../contexts/user/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";

const EditProfile = () => {
    const navigate = useNavigate();
    const {setPage} = useContext(headerContext);
    const { user, updateUserInfo } = useContext(userContext);

    const [edit, setEdit] = useState(false);

    const initialValues = {...user, password: ""};
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
        password: Yup.string()
            .min(5, "Password must be 5 charaters at minimum"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    useEffect(() => {
        setPage("");
    },[])

    const handleUpdate = (values) => {
        delete values.confirmPassword;
        if(values.password === ''){
            values.password = user.password;
        }
        updateUserInfo(values, '/');
    }

    return (
        <div className='main'>
            <div className="title">
                <h2 style={{display: 'inline-block', textAlign: 'center', borderBottom: '3px solid tomato', paddingBottom: 25}}>Profile</h2>
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
                                <label className='d-block mt-3' htmlFor="firstName">First Name *</label>
                                <TextField disabled={!edit} id='firstName' name='firstName' onChange={handleChange} onBlur={handleBlur} value={values.firstName} error={errors.firstName && touched.firstName} helperText={errors.firstName && touched.firstName?errors.firstName:''} fullWidth variant='outlined' size='small'/>        
                            </div>
                            <div className="col-md-6">
                                <label className='d-block mt-3' htmlFor="lastName">Last Name *</label>
                                <TextField disabled={!edit} id='lastName' name='lastName' onChange={handleChange} onBlur={handleBlur} value={values.lastName} error={errors.lastName && touched.lastName} helperText={errors.lastName && touched.lastName?errors.lastName:''} fullWidth variant='outlined' size='small'/>        
                            </div>
                            <div className="col-md-6">
                                <label className='d-block mt-3' htmlFor="email">Email Address *</label>
                                <TextField disabled={!edit} id='email' name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} error={errors.email && touched.email} helperText={errors.email && touched.email?errors.email:''} fullWidth variant='outlined' size='small'/>
                            </div>
                            <div className="col-md-6">
                                <label className='d-block mt-3' htmlFor="password">Password *</label>
                                <TextField disabled={!edit} id='password' name='password' onChange={handleChange} onBlur={handleBlur} value={values.password} error={errors.password && touched.password} helperText={errors.password && touched.password?errors.password:''} fullWidth variant='outlined' size='small'/>        
                            </div>
                            <div className="col-md-6">
                                <label className='d-block mt-3' htmlFor="confirmPassword">Confirm Password *</label>
                                <TextField disabled={!edit} id='confirmPassword' name='confirmPassword' onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} error={touched.password && values.password != '' && !touched.confirmPassword && values.password != values.confirmPassword} fullWidth variant='outlined' size='small'/>        
                                <div className='text-danger badge fw-normal ps-3'>
                                    {touched.password && values.password != '' && !touched.confirmPassword?'Confirm Password is Required':''}
                                    {touched.password && values.password != '' && touched.confirmPassword && values.password != values.confirmPassword?'Passwords must match.':''}
                                </div>
                            </div>
                        </div>
                        {edit ?
                        <>
                            <Button className='mt-5 me-3' type='submit' sx={{bgcolor: '#80bf32', width: 100}} color='success' variant="contained">Save</Button>
                            <Button className='mt-5' sx={{bgcolor: '#f14d54', width: 100}} onClick={() => setEdit(false)} color='error' variant="contained">Cancel</Button>
                        </>
                        :
                            <Button className='mt-5' sx={{bgcolor: '#80bf32', width: 200}} onClick={() => setEdit(true)} color='success' variant="contained">Edit Profile</Button>
                        }
                    </form>
                )}
            </Formik>
            </div>
        </div>
    )
}

export default EditProfile;