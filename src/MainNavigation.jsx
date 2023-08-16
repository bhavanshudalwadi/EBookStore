import React, { useContext } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import BookListing from "./components/BookListing";
import Users from "./components/Users";
import EditUser from "./components/EditUser";
import Books from "./components/Books";
import EditBook from "./components/EditBook";
import Categories from "./components/Categories";
import EditCategory from "./components/EditCategory";
import EditProfile from "./components/EditProfile";
import userContext from './contexts/user/userContext';

const MainNavigation = () => {
    const { user } = useContext(userContext);

    const RedirectLogin = <Navigate to="/login" />;
    const RedirectHome = <Navigate to="/" />;

    return (
        <Routes>
            <Route path="/" element={<BookListing />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
    
            <Route path="/users" element={<Users />} />
            <Route path="/edit-user/:id" element={<EditUser />} />    

            <Route path="/books" element={<Books />} />
            <Route path="/add-book" element={<EditBook />} />
            <Route path="/edit-book/:id" element={<EditBook />} />

            <Route path="/categories" element={<Categories />} />
            <Route path="/add-category" element={<EditCategory />} />
            <Route path="/edit-category/:id" element={<EditCategory />} />

            <Route path="/profile" element={<EditProfile />} />
            <Route path="/cart" element={<Cart />} />
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default MainNavigation;