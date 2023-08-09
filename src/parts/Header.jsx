import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Box from '@mui/material/Box';
import { Button, TextField, Breadcrumbs, Typography, Autocomplete } from '@mui/material';
import headerContext from '../contexts/header/headerContext';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../public/icon.png';
import userContext from '../contexts/user/userContext';

const Header = () => {
    const { user, setUser } = useContext(userContext);
    const [searchList, setSearchList] = useState([
        {
            "title": "Title 1",
            "category": "category",
            "price": 1000,
            "description": "Description"
        },
        {
            "title": "Title 2",
            "category": "category",
            "price": 500,
            "description": "Description"
        }
    ]);
    const navigateTo = useNavigate();
    const { page } = useContext(headerContext);
    
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        setUser(null);
        navigateTo('/login');
    }

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
                        <ul className='nav-links'>
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
                            {user != null ? (user.roleId === 1 || user.roleId === 2 || user.roleId === 3) &&
                                <li>
                                    <Link to="/profile" className='link'>Profile</Link>
                                </li>:<></>
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
                                    <span>0</span>&nbsp;
                                    <span style={{color: 'black', textTransform: 'none'}}>Cart</span>
                                </Button>
                            </li>
                            {user !== null &&
                            <li>
                                <Button className='ms-4' color="inherit" variant="outlined" endIcon={<LogoutRoundedIcon />}  onClick={handleLogout}>
                                    Logout
                                </Button>
                            </li>}
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
                disableClearable
                className='search-input'
                options={searchList}
                autoHighlight
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'space-between', justifyContent: 'space-between'}} component="li" {...props}>
                        <Box sx={{display: 'flex', width: '100%', alignItems: 'space-between', justifyContent: 'space-between'}}>
                            <h5>{option.title}</h5>
                            <h6>{option.price}</h6>
                        </Box>
                        <Box sx={{display: 'flex', width: '100%', alignItems: 'space-between', justifyContent: 'space-between'}}>
                            <h5>{option.category}</h5>
                            <Button color="error" onClick={() => alert(option.title)}>Add to cart</Button>
                        </Box>
                        <h5 style={{width: '100%'}}>{option.description}</h5>
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder='Tell me what you want ?'
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
            {/* <TextField variant='outlined' size='small' style={{backgroundColor: 'white', width: 422, marginRight: 10}} placeholder='Tell me what you want ?' /> */}
            {/* <Button sx={{marginRight: 2}} color="success" variant="contained" startIcon={<SearchIcon />} onClick={()=>{}}>
                <span style={{color: 'white', textTransform: 'none'}}>Search</span>
            </Button>
            <Button color="error" variant="contained" onClick={()=>{}}>
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