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
            <Route path="/" element={user ? <BookListing /> : RedirectLogin } />
            <Route path="/profile" element={user ? <EditProfile /> : RedirectLogin} />
            <Route path="/cart" element={user ? <Cart /> : RedirectLogin} />

            <Route path="/login" element={!user ? <Login /> : RedirectHome } />
            <Route path="/register" element={!user ? <Register /> : RedirectHome} />
    
            <Route path="/users" element={user && user.roleId === 1 ? <Users /> : RedirectHome} />
            <Route path="/edit-user/:id" element={user && user.roleId === 1 ? <EditUser /> : RedirectHome} />

            <Route path="/books" element={user && (user.roleId === 2 || user.roleId === 1) ? <Books /> : RedirectHome} />
            <Route path="/add-book" element={user && (user.roleId === 2 || user.roleId === 1) ? <EditBook /> : RedirectHome} />
            <Route path="/edit-book/:id" element={user && (user.roleId === 2 || user.roleId === 1) ? <EditBook /> : RedirectHome} />

            <Route path="/categories" element={user && user.roleId === 1 ? <Categories /> : RedirectHome} />
            <Route path="/add-category" element={user && user.roleId === 1 ? <EditCategory /> : RedirectHome} />
            <Route path="/edit-category/:id" element={user && user.roleId === 1 ? <EditCategory />: RedirectHome} />
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default MainNavigation;