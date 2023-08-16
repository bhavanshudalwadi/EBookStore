import React, { useEffect, useContext, useState } from 'react'
import headerContext from '../contexts/header/headerContext';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import cartContext from '../contexts/cart/cartContext';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const { setPage } = useContext(headerContext);
    const { cartItems, getCartItems, increaseQuantity, decreaseQuantity, removeCartItem, makeOrder } = useContext(cartContext);

    useEffect(() => {
        setPage("");
        // getCartItems();
    },[])

    const calculateTotalPrice = () => {
        let total = 0;
        cartItems.length > 0 && cartItems.forEach((item) => {
            total += item.quantity * item.book.price;
        })
        setTotalPrice(total);
    }

    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems])

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
                            <h5>My Shoping Bag ({cartItems?.length} Items)</h5>
                            <h5>Toatal price: {totalPrice}</h5>
                        </div>
                        {
                            cartItems && cartItems.map((item) =>
                                <Card key={item.id} className='mt-3' sx={{ display: 'flex' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ maxHeight: 150, maxWidth: 150 }}
                                        image={item.book.base64image}
                                        alt={item.book.name}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                                <h5>{item.book.name}</h5>
                                                <h5>{item.book.price}</h5>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                                <Typography className='text-danger' variant="subtitle1" color="text.secondary" component="div">
                                                    Cart Item Name
                                                </Typography>
                                                {/* <div>
                                                    <Typography className='text-decoration-line-through' variant="subtitle1" color="text.secondary" component="span">
                                                        1000
                                                    </Typography>
                                                    &nbsp;&nbsp;
                                                    <h5 className='text-danger' style={{display: 'inline-block'}}>50% off</h5>
                                                </div> */}
                                            </Box>
                                        </CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: 2, pr: 2, pb: 2}}>
                                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                                <Button className='me-2' sx={{bgcolor: '#f14d54', minWidth: 0, width: 40}} onClick={() => decreaseQuantity(item.id, item.book.id, item.quantity)} color="error" variant="contained"><RemoveRoundedIcon /></Button>
                                                <Chip className='me-2 rounded' label={item.quantity} variant="outlined" />
                                                <Button sx={{bgcolor: '#f14d54', minWidth: 0, width: 40}} onClick={() => increaseQuantity(item.id, item.book.id, item.quantity)} color="error" variant="contained"><AddRoundedIcon /></Button>
                                            </Box>
                                            <Button color="error" sx={{textTransform: 'none'}} onClick={() => removeCartItem(item.id)}>Remove</Button>
                                        </Box>
                                    </Box>
                                </Card>
                            )
                        }
                        <Button className='mt-5' style={{bgcolor: '#f14d54', textTransform: 'none'}} onClick={makeOrder} color="error" variant="contained">Place order</Button>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </div>
    )
}

export default Cart