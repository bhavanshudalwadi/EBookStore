import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./parts/Header";
import Footer from "./parts/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import ProductListing from "./components/ProductListing";
import NotFound from "./components/NotFound";
import EditProduct from "./components/EditProduct";
import Cart from "./components/Cart";
import BookListing from "./components/BookListing";
import Users from "./components/Users";
import EditUser from "./components/EditUser";
import AlertDialog from "./components/AlertDialog";
import Alert from "./components/Alert";
import Loader from "./components/Loader";
import HeaderState from "./contexts/header/HeaderState";
import UserState from "./contexts/user/UserState";
import AlertState from "./contexts/alert/AlertState";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AlertState>
          <HeaderState>
            <UserState>
              <Header />
                <Routes>
                  <Route path="/" element={<BookListing />} />
                  <Route path="/home" element={<ProductList />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="users" element={<Users />} />
                  <Route path="products" element={<ProductListing />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="edit-user/:id" element={<EditUser />} />
                  
                  <Route path="admin/products" element={<ProductList />} />
                  <Route path="admin/product/:id" element={<EditProduct />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              <Footer />
              <Alert />
              <AlertDialog />
              <Loader />
            </UserState>
          </HeaderState>
        </AlertState>
      </BrowserRouter>
    </>
  )
}

export default App;