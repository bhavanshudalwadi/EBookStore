import React, {useContext, useEffect} from 'react'
import headerContext from '../contexts/header/headerContext';
import { TextField, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const BookListing = () => {
    const {setPage} = useContext(headerContext);

    useEffect(()=>{
        setPage("");
    },[])

    return (
        <div className='main'>
            <div className="title">
                <h2 style={{display: 'inline-block', textAlign: 'center', borderBottom: '3px solid tomato', paddingBottom: 25}}>Book Listing</h2>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="row col-md-10">
                        <div className="col-md-3">
                            <h4>Total - N Items</h4>
                        </div>
                        <div className="col-md-6">
                            <TextField variant="outlined" size='small' fullWidth placeholder='Serch Books'/>
                        </div>
                        <div className="col-md-3" style={{textAlign: 'right'}}>
                            <h5>
                                Sort By &nbsp;
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    size='small'
                                    style={{width: 100}}
                                >
                                    <MenuItem value={10}>a - z</MenuItem>
                                    <MenuItem value={20}>z - a</MenuItem>
                                </Select>
                            </h5>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="row col-md-10">
                        <div className="col-md-3 mt-4">
                            <Card>
                                <CardMedia
                                    sx={{ height: 200 }}
                                    image="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHucZhB9HKmdgH4zcJrwdcgZFNARIOo0GCzNPJMsm-8OxJg93g"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <h5 className='book-title'>STEVE JOBS : THE EXCLUSIVE BIOGRAPHY</h5>
                                    <span style={{color: '#838383', display: 'block', fontWeight: 500, marginBottom: 10}}>category</span>
                                    <p className='book-description'>'This is a riveting book, with as much to say about the transformation of modern life in the information age as about its supernaturally gifted and driven subject' - Telegraph Based on more than forty interviews with Steve Jobs conducted over two years - as well as interviews with more than a hundred family members, friends, adversaries, , and colleagues - this is the acclaimed, internationally bestselling biography of the ultimate icon of inventiveness. Walter Isaacson tells the story of the rollercoaster life and searingly intense personality of creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries: personal computers, animated movies,music, phones, tablet computing, and digital publishing. Although Jobs cooperated with this book, he asked for no control over what was written, nor even the right to read it before it was published. He put nothing off limits. He encouraged the people he knew to speak honestly. And Jobs speaks candidly, sometimes brutally so, about the people he worked with and competed against. His friends, foes, and colleagues provide an unvarnished view of the passions, perfectionism, obsessions, artistry, devilry, and compulsion for control that shaped his approach to business and the innovative products that resulted.</p>
                                    <h5 className='price'>MRP ₹ 350</h5>
                                    <Button variant="contained" color='error' fullWidth disableElevation>Add To Cart</Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-3 mt-4">
                            <Card>
                                <CardMedia
                                    sx={{ height: 200 }}
                                    image="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHucZhB9HKmdgH4zcJrwdcgZFNARIOo0GCzNPJMsm-8OxJg93g"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <h5 className='book-title'>STEVE JOBS : THE EXCLUSIVE BIOGRAPHY</h5>
                                    <span style={{color: '#838383', display: 'block', fontWeight: 500, marginBottom: 10}}>category</span>
                                    <p className='book-description'>'This is a riveting book, with as much to say about the transformation of modern life in the information age as about its supernaturally gifted and driven subject' - Telegraph Based on more than forty interviews with Steve Jobs conducted over two years - as well as interviews with more than a hundred family members, friends, adversaries, , and colleagues - this is the acclaimed, internationally bestselling biography of the ultimate icon of inventiveness. Walter Isaacson tells the story of the rollercoaster life and searingly intense personality of creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries: personal computers, animated movies,music, phones, tablet computing, and digital publishing. Although Jobs cooperated with this book, he asked for no control over what was written, nor even the right to read it before it was published. He put nothing off limits. He encouraged the people he knew to speak honestly. And Jobs speaks candidly, sometimes brutally so, about the people he worked with and competed against. His friends, foes, and colleagues provide an unvarnished view of the passions, perfectionism, obsessions, artistry, devilry, and compulsion for control that shaped his approach to business and the innovative products that resulted.</p>
                                    <h5 className='price'>MRP ₹ 350</h5>
                                    <Button variant="contained" color='error' fullWidth disableElevation>Add To Cart</Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-3 mt-4">
                            <Card>
                                <CardMedia
                                    sx={{ height: 200 }}
                                    image="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHucZhB9HKmdgH4zcJrwdcgZFNARIOo0GCzNPJMsm-8OxJg93g"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <h5 className='book-title'>STEVE JOBS : THE EXCLUSIVE BIOGRAPHY</h5>
                                    <span style={{color: '#838383', display: 'block', fontWeight: 500, marginBottom: 10}}>category</span>
                                    <p className='book-description'>'This is a riveting book, with as much to say about the transformation of modern life in the information age as about its supernaturally gifted and driven subject' - Telegraph Based on more than forty interviews with Steve Jobs conducted over two years - as well as interviews with more than a hundred family members, friends, adversaries, , and colleagues - this is the acclaimed, internationally bestselling biography of the ultimate icon of inventiveness. Walter Isaacson tells the story of the rollercoaster life and searingly intense personality of creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries: personal computers, animated movies,music, phones, tablet computing, and digital publishing. Although Jobs cooperated with this book, he asked for no control over what was written, nor even the right to read it before it was published. He put nothing off limits. He encouraged the people he knew to speak honestly. And Jobs speaks candidly, sometimes brutally so, about the people he worked with and competed against. His friends, foes, and colleagues provide an unvarnished view of the passions, perfectionism, obsessions, artistry, devilry, and compulsion for control that shaped his approach to business and the innovative products that resulted.</p>
                                    <h5 className='price'>MRP ₹ 350</h5>
                                    <Button variant="contained" color='error' fullWidth disableElevation>Add To Cart</Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-3 mt-4">
                            <Card>
                                <CardMedia
                                    sx={{ height: 200 }}
                                    image="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHucZhB9HKmdgH4zcJrwdcgZFNARIOo0GCzNPJMsm-8OxJg93g"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <h5 className='book-title'>STEVE JOBS : THE EXCLUSIVE BIOGRAPHY</h5>
                                    <span style={{color: '#838383', display: 'block', fontWeight: 500, marginBottom: 10}}>category</span>
                                    <p className='book-description'>'This is a riveting book, with as much to say about the transformation of modern life in the information age as about its supernaturally gifted and driven subject' - Telegraph Based on more than forty interviews with Steve Jobs conducted over two years - as well as interviews with more than a hundred family members, friends, adversaries, , and colleagues - this is the acclaimed, internationally bestselling biography of the ultimate icon of inventiveness. Walter Isaacson tells the story of the rollercoaster life and searingly intense personality of creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries: personal computers, animated movies,music, phones, tablet computing, and digital publishing. Although Jobs cooperated with this book, he asked for no control over what was written, nor even the right to read it before it was published. He put nothing off limits. He encouraged the people he knew to speak honestly. And Jobs speaks candidly, sometimes brutally so, about the people he worked with and competed against. His friends, foes, and colleagues provide an unvarnished view of the passions, perfectionism, obsessions, artistry, devilry, and compulsion for control that shaped his approach to business and the innovative products that resulted.</p>
                                    <h5 className='price'>MRP ₹ 350</h5>
                                    <Button variant="contained" color='error' fullWidth disableElevation>Add To Cart</Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-3 mt-4">
                            <Card>
                                <CardMedia
                                    sx={{ height: 200 }}
                                    image="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHucZhB9HKmdgH4zcJrwdcgZFNARIOo0GCzNPJMsm-8OxJg93g"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <h5 className='book-title'>STEVE JOBS : THE EXCLUSIVE BIOGRAPHY</h5>
                                    <span style={{color: '#838383', display: 'block', fontWeight: 500, marginBottom: 10}}>category</span>
                                    <p className='book-description'>'This is a riveting book, with as much to say about the transformation of modern life in the information age as about its supernaturally gifted and driven subject' - Telegraph Based on more than forty interviews with Steve Jobs conducted over two years - as well as interviews with more than a hundred family members, friends, adversaries, , and colleagues - this is the acclaimed, internationally bestselling biography of the ultimate icon of inventiveness. Walter Isaacson tells the story of the rollercoaster life and searingly intense personality of creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries: personal computers, animated movies,music, phones, tablet computing, and digital publishing. Although Jobs cooperated with this book, he asked for no control over what was written, nor even the right to read it before it was published. He put nothing off limits. He encouraged the people he knew to speak honestly. And Jobs speaks candidly, sometimes brutally so, about the people he worked with and competed against. His friends, foes, and colleagues provide an unvarnished view of the passions, perfectionism, obsessions, artistry, devilry, and compulsion for control that shaped his approach to business and the innovative products that resulted.</p>
                                    <h5 className='price'>MRP ₹ 350</h5>
                                    <Button variant="contained" color='error' fullWidth disableElevation>Add To Cart</Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-3 mt-4">
                            <Card>
                                <CardMedia
                                    sx={{ height: 200 }}
                                    image="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHucZhB9HKmdgH4zcJrwdcgZFNARIOo0GCzNPJMsm-8OxJg93g"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <h5 className='book-title'>STEVE JOBS : THE EXCLUSIVE BIOGRAPHY</h5>
                                    <span style={{color: '#838383', display: 'block', fontWeight: 500, marginBottom: 10}}>category</span>
                                    <p className='book-description'>'This is a riveting book, with as much to say about the transformation of modern life in the information age as about its supernaturally gifted and driven subject' - Telegraph Based on more than forty interviews with Steve Jobs conducted over two years - as well as interviews with more than a hundred family members, friends, adversaries, , and colleagues - this is the acclaimed, internationally bestselling biography of the ultimate icon of inventiveness. Walter Isaacson tells the story of the rollercoaster life and searingly intense personality of creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries: personal computers, animated movies,music, phones, tablet computing, and digital publishing. Although Jobs cooperated with this book, he asked for no control over what was written, nor even the right to read it before it was published. He put nothing off limits. He encouraged the people he knew to speak honestly. And Jobs speaks candidly, sometimes brutally so, about the people he worked with and competed against. His friends, foes, and colleagues provide an unvarnished view of the passions, perfectionism, obsessions, artistry, devilry, and compulsion for control that shaped his approach to business and the innovative products that resulted.</p>
                                    <h5 className='price'>MRP ₹ 350</h5>
                                    <Button variant="contained" color='error' fullWidth disableElevation>Add To Cart</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        </div>
    )
}

export default BookListing;