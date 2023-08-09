import React from 'react'
import { TextField, Select, MenuItem, Button } from '@mui/material'

const EditProduct = () => {
  return (
    <div className='main'>
        <div className="title">
            <h2 style={{display: 'inline-block', textAlign: 'center', borderBottom: '3px solid tomato', paddingBottom: 25}}>Edit Product</h2>
        </div>
        <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label className='d-block' htmlFor="fname">First Name *</label>
                <TextField id='fname' fullWidth sx={{'.MuiOutlinedInput-root': {borderRadius: '1px'}}} variant='outlined' size='small'/>
              </div>
              <div className="col-md-6">
                <label className='d-block' htmlFor="lname">Last Name *</label>
                <TextField id='lname' fullWidth sx={{'.MuiOutlinedInput-root': {borderRadius: '1px'}}} variant='outlined' size='small'/>
              </div>
              <div className="col-md-6 mt-4">
              <label className='d-block' htmlFor="shop-by-cat">Shop by Categories</label>
                <Select
                  id="shop-by-cat"
                  value={10}
                  onChange={() => {}}
                  fullWidth
                  sx={{'.MuiOutlinedInput-root': {borderRadius: '1px'}}}
                  variant='outlined'
                  size='small'
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </div>
              <div className="col-md-6 mt-4">
                <label className='d-block' htmlFor="desc">Description</label>
                <TextField id='desc' fullWidth sx={{'.MuiOutlinedInput-root': {borderRadius: '1px'}}} multiline variant='outlined' size='small'/>
              </div>
              <div className="col-md-6 mt-5">
                {/* <label className='d-block' htmlFor="file">Description</label> */}
                <TextField type='file' sx={{padding: 0, ',.MuiOutlinedInput-input': {padding: 0, height: '100%'}, ',.MuiOutlinedInput-root': {borderRadius: '1px'}}} typeof='file' itemType='file' id='file' fullWidth variant='outlined'/>
              </div>
            </div>
            <Button className='mt-5 me-2' style={{borderRadius: 0, width: 100, textTransform: 'none'}} onClick={() => {}} color="success" variant="contained">Save</Button>
            <Button className='mt-5' style={{borderRadius: 0, width: 100, textTransform: 'none'}} onClick={() => {}} color="error" variant="contained">Cancel</Button>
        </div>
    </div>
  )
}

export default EditProduct