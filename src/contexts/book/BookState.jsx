import bookContext from './bookContext';
import { fetchBooks, addBook, getSingleBook, updateBook, deleteBook, globleBookSearch } from '../../API';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import alertContext from '../alert/alertContext';

const BookState = ({children}) => {
    const [books, setBooks] = useState([]);
    const [globleBooks, setGlobleBooks] = useState([]);
    const [searchProgress, setSearchProgress] = useState(false);
    const [bookDetails, setBookDetails] = useState({});
    const [singleBook, setSingleBook] = useState({});

    const { setShowAlert, setShowProgress } = useContext(alertContext);
    const navigate = useNavigate();

    const globleSearch = (search) => {
        if(search === ''){
            setGlobleBooks([]);
        }else{
            setSearchProgress(true);
            globleBookSearch(search)
                .then(res => {
                    if(res.data.key === "SUCCESS") {
                        console.log(res.data.result);
                        setGlobleBooks(res.data.result);
                    }else{
                        console.log(res.data);
                        setShowAlert(res.data.error?res.data.error:'Server Error');
                    }
                    setSearchProgress(false);
                })
                .catch(error => {
                    console.log(error);
                    setSearchProgress(false);
                    if(typeof error.response.data.error === 'string') {
                        setShowAlert(error.response.data.error?error.response.data.error:'Server Error');
                    }else{
                        setShowAlert(error.response.data.key?error.response.data.key:'Server Error');
                    }
                })
        }
    }

    const searchBooks = (pgIndex, pgSize, search) => {
        setShowProgress(true);
        fetchBooks(pgIndex, pgSize, search)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setBookDetails({
                        pageIndex: res.data.result.pageIndex,
                        pageSize: res.data.result.pageSize,
                        totalItems: res.data.result.totalItems,
                        totalPages: res.data.result.totalPages
                    })
                    setBooks(res.data.result.items);
                    console.log(res.data.result.items);
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Server Error');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Server Error');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Server Error');
                }
            })
    }

    const createBook = async(data) => {
        setShowProgress(true);
        addBook(data)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    console.log("New Book Added");
                    setShowAlert("New Book Added");
                    navigate('/books');
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Book Not Added');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Book Not Added');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Book Not Added');
                }
            })
    }

    const getBookById = async(id) => {
        setShowProgress(true);
        getSingleBook(id)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setSingleBook(res.data.result);
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Server Error');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Server Error');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Server Error');
                }
            })
    }

    const getBooks = async (pgIndex, pgSize, search) => {
        setShowProgress(true);
        fetchBooks(pgIndex, pgSize, search)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setBookDetails({
                        pageIndex: res.data.result.pageIndex,
                        pageSize: res.data.result.pageSize,
                        totalItems: res.data.result.totalItems,
                        totalPages: res.data.result.totalPages
                    })
                    if(pgIndex == 1) {
                        setBooks(res.data.result.items);
                        console.log(res.data.result.items);
                    }else{
                        setBooks(books.concat(res.data.result.items));
                        console.log(books.concat(res.data.result.items));
                    }
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Server Error');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Server Error');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Server Error');
                }
            })
    }

    const updateBookInfo = (data) => {
        setShowProgress(true);
        updateBook(data)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    console.log("Book Details Updated");
                    setShowAlert('Book Updated Successfully');
                    navigate('/books');
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Book Not Updated');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Book Not Updated');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Book Not Updated');
                }
            });
    }

    const deleteBookInfo = (id, perPage, searchParam) => {
        setShowProgress(true);
        deleteBook(id)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setShowAlert('Book Deleted Successfully');
                    setBooks([]);
                    searchBooks(1, perPage, searchParam);
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Book Not Deleted');
                }
                setShowProgress(false);
            }).catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Book Not Deleted');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Book Not Deleted');
                }
            });
    }

    return (
        <bookContext.Provider value={{books, setBooks, singleBook, setSingleBook, bookDetails, setBookDetails, searchBooks, createBook, getBookById, getBooks, updateBookInfo, deleteBookInfo, globleSearch, globleBooks, setGlobleBooks, searchProgress}}>
            { children }
        </bookContext.Provider>
    );
}

export default BookState;