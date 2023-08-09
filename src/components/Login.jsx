import React, {useContext, useEffect, useState} from 'react'
import headerContext from '../contexts/header/headerContext';
import { TextField, Button } from '@mui/material';
import userContext from '../contexts/user/userContext';
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
    const {setPage} = useContext(headerContext);
    const { userLogin } = useContext(userContext);

    useEffect(()=>{
        setPage("Login");
    },[])

    const initialValues = {
        email: "",
        password: "",
    };
    const validate = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is Required"),
        password: Yup.string()
            .min(5, "Password must be 5 charaters at minimum")
            .required("Password must Required"),
    });

    const handleLogin = async (values) => {
        userLogin(values)
    }

    return (
        <div className='main'>
            <div className="title">
                <h2 style={{display: 'inline-block', textAlign: 'center', borderBottom: '3px solid tomato', paddingBottom: 25}}>Login</h2>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h4 style={{borderBottom: '2px solid #ccc', paddingBottom: 20}}>New Customer</h4>
                        <p>Registration is free and easy.</p>
                        <ul>
                            <li>Faster Checkout</li>
                            <li>Save Multiple Shipping Addresses</li>
                            <li>View and track orders and more</li>
                        </ul>
                        <Button sx={{bgcolor: '#f14d54', mt: 15}} onClick={() => {window.location.href = "/regiter"}} color="error" variant="contained">Create an Account</Button>
                    </div>
                    <div className="col-md-6">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validate}
                            onSubmit={handleLogin}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <h4 style={{borderBottom: '2px solid #ccc', paddingBottom: 20}}>Registered Customer</h4>
                                    <p>If you have account with us. please log in.</p>
                                    <label className='d-block' htmlFor="email">Email Address *</label>
                                    <TextField id='email' name='email' className='w-75' type='email' onChange={handleChange} onBlur={handleBlur} value={values.email} helperText={errors.email && touched.email?errors.email:''} error={errors.email && touched.email} variant='outlined' size='small'/>
                                    <label className='d-block mt-4' htmlFor="pwd">Password *</label>
                                    <TextField id='pwd' name='password' className='w-75' type="password" onChange={handleChange} onBlur={handleBlur} value={values.password} helperText={errors.password && touched.password?errors.password:''} error={errors.password && touched.password} variant='outlined' size='small'/>
                                    <Button sx={{bgcolor: '#f14d54', display: 'block', mt: 2}} type="submit" color="error" variant="contained">Login</Button>
                                </form>            
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;