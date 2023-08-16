import React, {useContext, useEffect, useMemo, useState} from 'react'
import headerContext from '../contexts/header/headerContext';
import { TextField, Button, Pagination } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Book from './Book';
import bookContext from '../contexts/book/bookContext';
import categoryContext from '../contexts/category/categoryContext';

const BookListing = () => {
    const {setPage} = useContext(headerContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(8);
    const [sortBy, setSortBy] = useState("");
    const [search, setSearch] = useState('');

    const { books, bookDetails, searchBooks } = useContext(bookContext);
    const { categories, getAllCategories } = useContext(categoryContext);

    useEffect(()=>{
        setPage("");
        // getAllCategories();
        searchBooks(1, perPage, '');
    },[])

    const handlePageChange = (e, val) => {
        setCurrentPage(val);
    }

    const handlePerPageChange = (e) => {
        setPerPage(e.target.value);
        setCurrentPage(1);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value.trim());
        setCurrentPage(1);
    }

    useEffect(() => {
        const timer = setTimeout(() => searchBooks(currentPage, perPage, search), 500);
        return () => clearTimeout(timer);
    },[search, currentPage, perPage])

    const bookListWithCategory = useMemo(() => {
        let bookList = [...books];
        if (sortBy === "a-z") {
            // bookList.sort((a, b) => a.name.localeCompare(b.name));
            bookList.sort((a, b) => {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            });
        }
        if (sortBy === "z-a") {
            // bookList.sort((a, b) => b.name.localeCompare(a.name));
            bookList.sort((a, b) => {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                if (x > y) {return -1;}
                if (x < y) {return 1;}
                return 0;
            });
        }
        return bookList;
    }, [sortBy, books]);

    // bookListWithCategory = useMemo(() => {
    //     const bookList = [...books];
    //     if(bookList && categories) {
    //         bookList.forEach((book) => {
    //             book.category = categories.find(cat => cat.id === book.categoryId)?.name;
    //         });
    //       return bookList;
    //     }
    //     return [];
    // }, [categories, books]);

    return (
        <div className='main'>
            <div className="title">
                <h2 style={{display: 'inline-block', textAlign: 'center', borderBottom: '3px solid tomato', paddingBottom: 25}}>Book Listing</h2>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <h4>Total - {bookDetails.totalItems} Items</h4>
                    </div>
                    <div className="col-md-6">
                        <TextField variant="outlined" size='small' value={search} onChange={handleSearch} fullWidth placeholder='Serch Books'/>
                    </div>
                    <div className="col-md-4" style={{textAlign: 'left'}}>
                        <h5>
                            Per Page &nbsp;
                            <Select
                                labelId="per-page"
                                id="per-page"
                                size='small'
                                sx={{width: 70, mr: 4}}
                                value={perPage}
                                onChange={handlePerPageChange}
                            >
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                            </Select>
                            Sort By &nbsp;
                            <Select
                                labelId="sort-by"
                                id="sort-by"
                                size='small'
                                sx={{width: 80}}
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <MenuItem value={"a-z"}>a - z</MenuItem>
                                <MenuItem value={"z-a"}>z - a</MenuItem>
                            </Select>
                        </h5>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {bookListWithCategory?.map(book => 
                        <Book key={book.id} {...book} />
                    )}
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                    <Pagination count={bookDetails.totalPages} color="error" page={currentPage} onChange={handlePageChange} />
                </div>
            </div>
        </div>
    )
}

export default BookListing;