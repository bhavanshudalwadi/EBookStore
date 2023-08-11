import { Button, Card, CardContent, CardMedia } from '@mui/material';
import React from 'react'

const Book = ({id, base64image, name, description, price, category}) => {
  
  return (
    <div className="col-md-3 mt-4">
        <Card>
            <CardMedia
                sx={{ height: 200 }}
                image={base64image}
                title="green iguana"
            />
            <CardContent>
                <h5 className='book-title'>{name}</h5>
                <span style={{color: '#838383', display: 'block', fontWeight: 500, marginBottom: 10}}>{category}</span>
                <p className='book-description'>{description}</p>
                <h5 className='price'>MRP ₹{price}</h5>
                <Button variant="contained" color='error' fullWidth disableElevation>Add To Cart</Button>
            </CardContent>
        </Card>
    </div>
  )
}

export default Book;