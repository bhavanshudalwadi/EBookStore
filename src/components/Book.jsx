import { Button, Card, CardContent, CardMedia } from '@mui/material';
import React, { useContext } from 'react'
import cartContext from '../contexts/cart/cartContext';

const Book = ({id, base64image, name, description, price, category}) => {
  const { addItemToCart } = useContext(cartContext);

  return (
    <div className="col-md-3 mt-4">
        <Card>
            <CardMedia
                sx={{ height: 200 }}
                image={base64image}
                title={name}
            />
            <CardContent>
                <h5 className='book-title'>{name}</h5>
                <span style={{color: '#838383', display: 'block', fontWeight: 500, marginBottom: 10}}>{category}</span>
                <p className='book-description'>{description}</p>
                <h5 className='price'>MRP ₹{price}</h5>
                <Button variant="contained" color='error' fullWidth disableElevation onClick={() => addItemToCart(id, 1)}>Add To Cart</Button>
            </CardContent>
        </Card>
    </div>
  )
}

export default Book;