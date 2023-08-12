import bookContext from './bookContext';
import { fetchBooks, addBook, getSingleBook, updateBook, deleteBook } from '../../API';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import alertContext from '../alert/alertContext';

const BookState = ({children}) => {
    const [books, setBooks] = useState([]);
    const [bookDetails, setBookDetails] = useState({});
    const [singleBook, setSingleBook] = useState({});

    const { setShowAlert, setShowProgress } = useContext(alertContext);
    const navigate = useNavigate();

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
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
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
                    setShowAlert('Book Not Added');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
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
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
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
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
            })
    }

    const updateBookInfo = (data) => {
        setShowProgress(true);
        updateBook(data)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    console.log("Book Details Updated");
                    setShowAlert('Book Updated Sucessfully');
                    navigate('/books');
                }else{
                    console.log(res.data);
                    setShowAlert('Book Updatedation Failed');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                setShowAlert('Book Updatedation Failed');
            });
    }

    const deleteBookInfo = (id, perPage, searchParam) => {
        setShowProgress(true);
        deleteBook(id)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setShowAlert('Book Deleted Sucessfully');
                    setBooks([]);
                    searchBooks(1, perPage, searchParam);
                }else{
                    console.log(res.data);
                    setShowAlert('Book Not Deleted');
                }
                setShowProgress(false);
            }).catch(error => {
                console.log(error);
                setShowProgress(false);
                setShowAlert('Book Not Deleted');
            });
    }

    return (
        <bookContext.Provider value={{books, setBooks, singleBook, setSingleBook, bookDetails, setBookDetails, searchBooks, createBook, getBookById, getBooks, updateBookInfo, deleteBookInfo}}>
            { children }
        </bookContext.Provider>
    );
}

export default BookState;