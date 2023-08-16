import React, { useContext, useEffect, useState } from 'react';
import headerContext from '../contexts/header/headerContext';
import { FormControl, MenuItem, Select, TextField, Button, IconButton } from '@mui/material';
import userContext from '../contexts/user/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import alertContext from '../contexts/alert/alertContext';
import categoryContext from '../contexts/category/categoryContext';
import { Formik } from "formik";
import * as Yup from "yup";
import bookContext from '../contexts/book/bookContext';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const EditBook = () => {
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        name: "",
        description: "",
        price: "",
        categoryId: 0,
        base64image: ""
    });

    const {setPage} = useContext(headerContext);
    const {setShowAlert} = useContext(alertContext);
    const {categories, getAllCategories} = useContext(categoryContext);
    const { singleUser , setSingleUser, getUserById, updateUserInfo } = useContext(userContext);
    const { singleBook, setSingleBook, getBookById, updateBookInfo, createBook } = useContext(bookContext);
    const params = useParams();

    useEffect(() => {
        setPage("");
        getAllCategories();
        if(params.id) {
            getBookById(params.id);
        }
        return (() => { setSingleBook({}); setInitialValues({}); })
    },[])

    useEffect(() => {
        delete singleBook._id;
        delete singleBook.__v;
        delete singleBook.category;
        setInitialValues(singleBook)
    }, [singleBook])

    const handleSubmit = (values) => {
        console.log(values);
        if(params.id) {
            updateBookInfo(values);
        }else {
            createBook(values);
        }
    }

    const handleFileUpload = (e, setFieldValue, setFieldError) => {
        if(e.target.files.length > 0) {
            let ext = e.target.files[0].name.split('.')[1];
            let size = e.target.files[0].size / 1024;
            if(size < 10){
                if(ext === 'jpg' || ext === 'jpeg' || ext === 'png'){
                    let reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = function () {
                        setFieldValue('base64image', reader.result);
                    };
                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                        setFieldValue('base64image', '');
                        setShowAlert("Image Coversion Failed. Try Again");
                    };
                }else {
                    setFieldValue('base64image', '');
                    setShowAlert("Only .jpg, .jpeg or .png files are allowed");
                }
            }else {
                setFieldValue('base64image', '');
                setShowAlert("File size must be less than 10kb");
            }
        }
    }

    const validate = Yup.object().shape({
        name: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Book Name is Required"),
        description: Yup.string().required("Book Name is Required"),
        price: Yup.number()
            .min(0, "Price Can't Be Less Than Zero")
            .required("Book Price is Required"),
        categoryId: Yup.number().required("Category is Required"),
        base64image: Yup.string().required("Book Image is Required")
    });

    return (
        <div className='main'>
            <div className="title">
                <h2 style={{display: 'inline-block', textAlign: 'center', borderBottom: '3px solid tomato', paddingBottom: 25}}>{params.id?"Edit Book":"Add Book"}</h2>
            </div>
            <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={validate}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    setFieldError
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <label className='d-block' htmlFor="name">Book Name *</label>
                                <TextField id='name' name='name' onChange={handleChange} onBlur={handleBlur} value={values.name} error={errors.name && touched.name} helperText={errors.name && touched.name?errors.name:''} fullWidth variant='outlined' size='small'/>        
                            </div>
                            <div className="col-md-6">
                                <label className='d-block' htmlFor="price">Book Price (Rs) *</label>
                                <TextField id='price' name='price' type='number' onChange={handleChange} onBlur={handleBlur} value={values.price} error={errors.price && touched.price} helperText={errors.price && touched.price?errors.price:''} fullWidth variant='outlined' size='small'/>        
                            </div>
                            <div className="col-md-6">
                                <label className='d-block mt-3' htmlFor="categoryId">Category *</label>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="categoryId"
                                        name="categoryId"
                                        id="categoryId"
                                        size='small'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.categoryId}
                                        error={errors.categoryId && touched.categoryId}
                                    >
                                        {categories && categories.map(cat => <MenuItem value={cat.id} key={cat.id}>{cat.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <div className='text-danger badge fw-normal ps-3'>
                                    {errors.categoryId && touched.categoryId?errors.categoryId:''}
                                </div>
                            </div>
                            <div className="col-md-6">
                                {values.base64image ? 
                                <div className='h-100 d-flex align-items-end'>
                                    <img src={values.base64image} style={{height: 'auto', width: 'auto', maxHeight: 80, borderRadius: 5}} />
                                    <IconButton aria-label="delete" size="large" onClick={() => setFieldValue('base64image', '')}>
                                        <CancelRoundedIcon fontSize="inherit" />
                                    </IconButton>
                                </div>
                                :<>
                                    <label className='d-block mt-3' htmlFor="base64image">Image *</label>
                                    <TextField
                                        type='file'
                                        sx={{padding: 0, ',.MuiOutlinedInput-input': {padding: 0, height: '100%'}}}
                                        typeof='file'
                                        itemType='file'
                                        fullWidth
                                        variant='outlined'
                                        id='base64image'
                                        name='base64image'
                                        onChange={(e) => handleFileUpload(e, setFieldValue, setFieldError)}
                                        error={errors.base64image && touched.base64image}
                                        helperText={errors.base64image && touched.base64image?errors.base64image:''}
                                    />
                                </>
                                }
                            </div>
                            <div className="col-md-12">
                                <label className='d-block mt-3' htmlFor="description">Description *</label>
                                <TextField id='description' multiline rows={3} name='description' onChange={handleChange} onBlur={handleBlur} value={values.description} error={errors.description && touched.description} helperText={errors.description && touched.description?errors.description:''} fullWidth variant='outlined' size='small'/>
                            </div>
                        </div>
                        <Button className='mt-5 me-3' type="submit" sx={{bgcolor: '#80bf32', width: 100}} color='success' variant="contained">Save</Button>
                        <Button className='mt-5' sx={{bgcolor: '#f14d54', width: 100}} onClick={() => navigate('/books')} color='error' variant="contained">Cancel</Button>
                    </form>
                )}
            </Formik>
            </div>
        </div>
    )
}

export default EditBook;