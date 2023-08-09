import React, { useEffect, useContext } from 'react'
import headerContext from '../contexts/header/headerContext';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Cart = () => {
    const {setPage} = useContext(headerContext);

    useEffect(()=>{
        setPage("");
    },[])

    return (
        <div className='main'>
            <div className="title">
                <h2 style={{display: 'inline-block', textAlign: 'center', borderBottom: '3px solid tomato', paddingBottom: 25}}>Cart page</h2>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-between">
                            <h5>My Shoping Bag (3 Items)</h5>
                            <h5>Toatal price: 3000</h5>
                        </div>
                        {
                            [1,2,3,4].map((index)=>
                                <Card key={index} className='mt-3' sx={{ display: 'flex' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151 }}
                                        image="http://via.placeholder.com/200x200"
                                        alt="Live from space album cover"
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                                <h5>Cumpus Sutra</h5>
                                                <h5>500</h5>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                                <Typography className='text-danger' variant="subtitle1" color="text.secondary" component="div">
                                                    Cart Item Name
                                                </Typography>
                                                <div>
                                                    <Typography className='text-decoration-line-through' variant="subtitle1" color="text.secondary" component="span">
                                                        1000
                                                    </Typography>
                                                    &nbsp;&nbsp;
                                                    <h5 className='text-danger' style={{display: 'inline-block'}}>50% off</h5>
                                                </div>
                                            </Box>
                                        </CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: 2, pr: 2, pb: 2}}>
                                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                                <Button className='me-2' sx={{borderRadius: 0, minWidth: 0}} onClick={() => {}} color="error" variant="contained">–</Button>
                                                <Chip className='me-2' sx={{borderRadius: 0}} label="1" variant="outlined" />
                                                <Button sx={{borderRadius: 0, minWidth: 0}} onClick={() => {}} color="error" variant="contained">+</Button>
                                            </Box>
                                            <Button color="error">Remove</Button>
                                        </Box>
                                    </Box>
                                </Card>
                            )
                        }
                        <Button className='mt-5' style={{borderRadius: 0, textTransform: 'none'}} onClick={() => {}} color="error" variant="contained">Place order</Button>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </div>
    )
}

export default Cart