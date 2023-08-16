import React, { useContext, useEffect, useRef, useState } from 'react'
import './Header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Box from '@mui/material/Box';
import { Button, TextField, Breadcrumbs, Typography, Autocomplete, CircularProgress } from '@mui/material';
import headerContext from '../contexts/header/headerContext';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../public/icon.png';
import userContext from '../contexts/user/userContext';
import bookContext from '../contexts/book/bookContext';
import cartContext from '../contexts/cart/cartContext';

const Header = () => {
    const { page } = useContext(headerContext);
    const { user, setUser } = useContext(userContext);
    const { searchProgress, globleBooks, globleSearch } = useContext(bookContext);
    const { cartItems, getCartItems, addItemToCart } = useContext(cartContext);
    const searchInput = useRef();
    const navigateTo = useNavigate();
    
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        setUser(null);
        navigateTo('/login');
    }

    const handleSearchChange = (e) => {
        globleSearch(e.target.value);
        // console.log(e.target.value);
    }

    useEffect(() => {
        if(user) {
            getCartItems();
        }
    }, [])

    return (
    <>
        <div className='nav-border'></div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link to="/" style={{textDecoration: 'none', color: '#2d2d2d'}}>
                    <div style={{display: 'flex', margin: '10px 0', alignItems: 'center'}}>
                        <img src={Icon} alt="Icon" style={{width: 50, height: 50, margin: '0 10px'}} />
                        <div>
                            <h2 className='nav-title'>Book Store</h2>
                            <p className='nav-subtitle'>By Bhavanshu Dalwadi</p>
                        </div>
                    </div>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                    <div className="d-flex" role="search">
                        <ul className='nav-links p-0'>
                            {/* {user} */}
                            {user != null ? user.roleId === 1 &&
                                <>
                                    <li>
                                        <span style={{paddingRight: 15, borderRight: '2px solid #999'}}>
                                            <Link to="/users" className='link'>Users</Link>
                                        </span>
                                    </li>
                                    <li>
                                        <span style={{paddingRight: 15, borderRight: '2px solid #999'}}>
                                            <Link to="/categories" className='link'>Categories</Link>
                                        </span>
                                    </li>
                                </>:<></>
                            }
                            {user != null ? (user.roleId === 1 || user.roleId === 2) &&
                                <li>
                                    <span style={{paddingRight: 15, borderRight: '2px solid #999'}}>
                                        <Link to="/books" className='link'>Books</Link>
                                    </span>
                                </li>:<></>
                            }
                            {user != null &&
                                <li>
                                    <Link to="/profile" className='link'>Profile</Link>
                                </li>
                            }
                            {user === null &&
                            <>
                                <li>
                                    <Link to="/login" className='link'>Login</Link>
                                </li>
                                <li>
                                    <span style={{paddingLeft: 15, borderLeft: '2px solid #999'}}>
                                        <Link to="/register" className='link'>Register</Link>
                                    </span>
                                </li>
                            </>}
                            <li>
                                <Button sx={{color: 'tomato'}} color="error" variant="outlined" startIcon={<ShoppingCartIcon />}  onClick={()=>{navigateTo('/cart')}}>
                                    <span>{cartItems?.length}</span>&nbsp;
                                    <span style={{color: 'black', textTransform: 'none'}}>Cart</span>
                                </Button>
                            </li>
                            {user !== null &&
                            <li>
                                <Button className='btn-logout' color="inherit" variant="outlined" endIcon={<LogoutRoundedIcon />}  onClick={handleLogout}>
                                    Logout
                                </Button>
                            </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <div className='nav-search'>
            {/* <Autocomplete
                freeSolo
                id="search"
                disableClearable
                options={searchList.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder='Tell me what you want ?'
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
                variant='outlined'
                size='small'
                style={{backgroundColor: 'white', width: 422, marginRight: 10}}
            /> */}
            <Autocomplete
                freeSolo
                id="search"
                className='search-input me-3'
                options={globleBooks}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'space-between', justifyContent: 'space-between', zIndex: (theme) => theme.zIndex.drawer + 1}} component="li" {...props}>
                        <Box className='d-flex w-100 align-items-between justify-content-between'>
                            <h6 className='fw-bold'>{option.name}</h6>
                            <h6>{option.price}</h6>
                        </Box>
                        <Box className='d-flex w-100 align-items-between justify-content-between'>
                            <h6 className='w-75 mt-2' style={{color: '#838383', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{option.description}</h6>
                            <Button color="error" size='small' className='w-25' onClick={() => addItemToCart(option.id, 1)}>Add to cart</Button>
                        </Box>
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder='Tell me what you want ?'
                        inputRef={searchInput}
                        onChange={handleSearchChange}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password',
                        }}
                    />
                )}
                variant='outlined'
                size='small'
                style={{backgroundColor: 'white'}}
            />
            <CircularProgress className={searchProgress?'visible':'invisible'} />
            {/* <TextField variant='outlined' size='small' style={{backgroundColor: 'white', width: 422, marginRight: 10}} placeholder='Tell me what you want ?' /> */}
            {/* <Button sx={{marginRight: 2}} color="success" variant="contained" onClick={() => setOpen(true)}>
                <span style={{color: 'white', textTransform: 'none'}}>Search</span>
            </Button> */}
            {/* <Button color="error" variant="contained" onClick={()=>{}}>
                <span style={{color: 'white', textTransform: 'none'}}>Cancel</span>
            </Button> */}
        </div>
        {page &&
            <div className='breadcrumbs'>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link underline="hover" key="1" color="inherit" to="/" className='link'>Home</Link>,
                    <Typography key="2" color="text.primary">{ page }</Typography>
                </Breadcrumbs>
            </div>
        }
    </>
    )
}

export default Header;