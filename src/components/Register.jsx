import React, {useContext, useEffect} from 'react'
import headerContext from '../contexts/header/headerContext';
import { TextField, Button, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik } from "formik";
import * as Yup from "yup";
import userContext from '../contexts/user/userContext';

const Register = () => {
    const { setPage } = useContext(headerContext);
    const { registerUser } = useContext(userContext);

    useEffect(()=>{
        setPage("Create an Account");
    },[])

    const handleRegister = (values) => {
        delete values.confirmPassword;
        // console.log(values);
        registerUser(values);
    }

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        roleId: "",
        password: "",
        confirmPassword: "",
    };
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
            .min(5, "Password must be 5 charaters at minimum")
            .required("Password must Required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Required"),
        roleId: Yup.number().required("Role is required"),
    });

    return (
        <div className='main'>
            <div className="title">
                <h2 style={{display: 'inline-block', textAlign: 'center', borderBottom: '3px solid tomato', paddingBottom: 25}}>Create an Account</h2>
            </div>
            <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={handleRegister}
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
                        <h4 style={{borderBottom: '2px solid #ccc', paddingBottom: 20}}>Personal Information</h4>
                        <p>Please enter the following information to create your account.</p>
                        <div className="row">
                            <div className="col-md-6">
                                <label className='d-block' htmlFor="firstName">First Name *</label>
                                <TextField id='firstName' name='firstName' onChange={handleChange} onBlur={handleBlur} value={values.firstName} error={errors.firstName && touched.firstName} helperText={errors.firstName && touched.firstName?errors.firstName:''} fullWidth variant='outlined' size='small'/>        
                            </div>
                            <div className="col-md-6">
                                <label className='d-block' htmlFor="lastName">Last Name *</label>
                                <TextField id='lastName' name='lastName' onChange={handleChange} onBlur={handleBlur} value={values.lastName} error={errors.lastName && touched.lastName} helperText={errors.lastName && touched.lastName?errors.lastName:''} fullWidth variant='outlined' size='small'/>        
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className='d-block mt-3' htmlFor="email">Email Address *</label>
                                <TextField id='email' name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} error={errors.email && touched.email} helperText={errors.email && touched.email?errors.email:''} fullWidth variant='outlined' size='small'/>
                            </div>
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
                        </div>
                        <h4 className='mt-4' style={{borderBottom: '2px solid #ccc', paddingBottom: 20}}>Login Information</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <label className='d-block' htmlFor="password">Password *</label>
                                <TextField id='password' name='password' onChange={handleChange} onBlur={handleBlur} value={values.password} error={errors.password && touched.password} helperText={errors.password && touched.password?errors.password:''} fullWidth variant='outlined' size='small'/>        
                            </div>
                            <div className="col-md-6">
                                <label className='d-block' htmlFor="confirmPassword">Confirm Password *</label>
                                <TextField id='confirmPassword' name='confirmPassword' onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} error={errors.confirmPassword && touched.confirmPassword} helperText={errors.confirmPassword && touched.confirmPassword?errors.confirmPassword:''} fullWidth variant='outlined' size='small'/>        
                            </div>
                        </div>
                        <Button className='mt-5' type='submit' sx={{bgcolor: '#f14d54'}} color="error" variant="contained">Register</Button>
                    </form>
                )}
            </Formik>
            </div>
        </div>
    )
}

export default Register;