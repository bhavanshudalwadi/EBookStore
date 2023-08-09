import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { Select, MenuItem, Button, CardActionArea, CardActions } from '@mui/material';

const ProductListing = () => {
  return (
    <div className='main'>
        <div className="title">
            <h2 style={{display: 'inline-block', textAlign: 'center', borderBottom: '3px solid tomato', paddingBottom: 25}}>Product Listing</h2>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h4>Product Name - 1000 items</h4>
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-end">
                    <lable className='d-inline me-2' htmlFor="sort-by">Sory By </lable>
                    <Select
                        id="sort-by"
                        value={10}
                        onChange={() => {}}
                        sx={{'.MuiOutlinedInput-root': {borderRadius: '1px'}}}
                        variant='outlined'
                        size='small'
                    >
                        <MenuItem value={10}>a - z</MenuItem>
                        <MenuItem value={20}>z - a</MenuItem>
                        <MenuItem value={30}>Newest First</MenuItem>
                    </Select>
                </div>
            </div>
            <div className="row">
                {
                    [1,2,3,4,5,6].map((index)=>
                        <div key={index} className="col-md-3 mt-4">
                            <Card style={{borderRadius: 8, borderWidth: 2}} variant="outlined">
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="http://via.placeholder.com/200x200"
                                        alt="200 x 200"
                                    />
                                    <CardContent style={{paddingBottom: 0}}>
                                        <Typography variant="h5">
                                            Product Title
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Lorem
                                        </Typography>
                                        <Typography className='mt-3' variant="body2">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, atque corrupti. Adipisci architecto, repellat nobis facere esse minima quo cupiditate earum iusto neque. Tempora ipsum sequi eaque tempore minus eligendi?
                                        </Typography>
                                        <Typography className='d-inline-block me-3 mt-3' color="gray" variant="h6">
                                            MRP <span className='text-decoration-line-through'>₹1000</span>
                                        </Typography>
                                        <Typography className='d-inline-block' color="green" variant="h6">
                                            20.00% OFF
                                        </Typography>
                                        <Typography variant="h6">
                                            ₹800
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions style={{margin: 8}}>
                                    <Button variant='contained' style={{borderRadius: 5}} fullWidth size="medium" color="error">
                                        Add To Cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    )
                }
            </div>
            <div className='d-flex align-items-center justify-content-center mt-4'>
                <Pagination count={10} color="error" />
            </div>
        </div>
    </div>
  )
}

export default ProductListing