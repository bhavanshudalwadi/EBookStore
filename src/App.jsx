import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./parts/Header";
import Footer from "./parts/Footer";
import AlertDialog from "./components/AlertDialog";
import Alert from "./components/Alert";
import Loader from "./components/Loader";
import HeaderState from "./contexts/header/HeaderState";
import UserState from "./contexts/user/UserState";
import AlertState from "./contexts/alert/AlertState";
import BookState from "./contexts/book/BookState";
import CategoryState from "./contexts/category/CategoryState";
import CartState from "./contexts/cart/CartState";
import MainNavigation from "./MainNavigation";
// import customTheme from "./customTheme";
// import { ThemeProvider } from "@mui/material";

const App = () => {
  return (
    <>
      {/* <ThemeProvider theme={customTheme}> */}
        <BrowserRouter>
          <AlertState>
            <UserState>
              <CartState>
                <HeaderState>
                  <CategoryState>
                    <BookState>
                      <Header />
                      <MainNavigation />
                      <Footer />
                      <Alert />
                      <AlertDialog />
                      <Loader />
                    </BookState>
                  </CategoryState>
                </HeaderState>
              </CartState>
            </UserState>
          </AlertState>
        </BrowserRouter>
      {/* </ThemeProvider> */}
    </>
  )
}

export default App;
