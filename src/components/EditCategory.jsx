import React, { useContext, useEffect, useState } from 'react';
import headerContext from '../contexts/header/headerContext';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import categoryContext from '../contexts/category/categoryContext';
import { Formik } from "formik";
import * as Yup from "yup";

const EditCategory = () => {
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        name: ""
    });

    const {setPage} = useContext(headerContext);
    const { singleCategory, setSingleCategory, getCategoryById, updateCategoryInfo, createCategory } = useContext(categoryContext);
    const params = useParams();

    useEffect(() => {
        setPage("");
        if(params.id) {
            getCategoryById(params.id);
        }
        return (() => { setSingleCategory({}); setInitialValues({}); })
    },[])

    useEffect(() => {
        delete singleCategory._id;
        delete singleCategory.__v;
        setInitialValues(singleCategory)
    }, [singleCategory])

    const handleSubmit = (values) => {
        console.log(values);
        if(params.id) {
            updateCategoryInfo(values);
        }else {
            createCategory(values);
        }
    }

    const validate = Yup.object().shape({
        name: Yup.string()
            .max(50, "Too Long!")
            .required("Name is Required")
    });

    return (
        <div className='main'>
            <div className="title">
                <h2 style={{display: 'inline-block', textAlign: 'center', borderBottom: '3px solid tomato', paddingBottom: 25}}>{params.id?"Edit Category":"Add Category"}</h2>
            </div>
            <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={handleSubmit}
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
                                <label className='d-block' htmlFor="name">Category Name *</label>
                                <TextField id='name' name='name' onChange={handleChange} onBlur={handleBlur} value={values.name} error={errors.name && touched.name} helperText={errors.name && touched.name?errors.name:''} fullWidth variant='outlined' size='small'/>        
                            </div>
                        </div>
                        <Button className='mt-5 me-3' type="submit" sx={{bgcolor: '#80bf32', width: 100}} color='success' variant="contained">Save</Button>
                        <Button className='mt-5' sx={{bgcolor: '#f14d54', width: 100}} onClick={() => navigate('/categories')} color='error' variant="contained">Cancel</Button>
                    </form>
                )}
            </Formik>
            </div>
        </div>
    )
}

export default EditCategory;