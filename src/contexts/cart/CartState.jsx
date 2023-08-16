import { useContext, useState } from "react";
import cartContext from "./cartContext";
import { fetchCartItems, addToCart, updateCart, removeCart, placeOrder } from "../../API";
import userContext from "../user/userContext";
import alertContext from "../alert/alertContext";
import { useNavigate } from "react-router-dom";

const CartState = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useContext(userContext);
    const { setShowAlert, setShowProgress } = useContext(alertContext);

    const navigate = useNavigate();

    const getCartItems = () => {
        setShowProgress(true);
        fetchCartItems(user.id)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setCartItems(res.data.result);
                    console.log(res.data.result);
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

    const increaseQuantity = (cartId, bookId, qty) => {
        setShowProgress(true);
        updateCart({
            id: cartId,
            bookId: bookId,
            userId: user.id,
            quantity: qty+1
        }).then(res => {
            if(res.data.key === "SUCCESS") {
                setCartItems(cartItems.map(item => item.id === cartId?{...item, quantity: item.quantity+1}:item));
                // console.log(cartItems.map(item => item.id === cartId?{...item, quantity: item.quantity+1}:item));
                // console.log(res.data.result);
            }else{
                console.log(res.data);
                setShowAlert(res.data.error?res.data.error:'Failed To Update Cart');
            }
            setShowProgress(false);
        })
        .catch(error => {
            console.log(error);
            setShowProgress(false);
            if(typeof error.response.data.error === 'string') {
                setShowAlert(error.response.data.error?error.response.data.error:'Failed To Update Cart');
            }else{
                setShowAlert(error.response.data.key?error.response.data.key:'Failed To Update Cart');
            }
        })
    }

    const decreaseQuantity = (cartId, bookId, qty) => {
        if(qty === 1) {
            setShowAlert('Item quantity should not be zero');
        }else{
            setShowProgress(true);
            updateCart({
                id: cartId,
                bookId: bookId,
                userId: user.id,
                quantity: qty-1
            }).then(res => {
                if(res.data.key === "SUCCESS") {
                    setCartItems(cartItems.map(item => item.id === cartId?{...item, quantity: item.quantity-1}:item));
                    // console.log(cartItems.map(item => item.id === cartId?{...item, quantity: item.quantity+1}:item));
                    // console.log(res.data.result);
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Failed To Update Cart');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Failed To Update Cart');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Failed To Update Cart');
                }
            })
        }
    }

    const addItemToCart = (bookId, quantity) => {
        setShowProgress(true);
        addToCart({ bookId, userId: user.id, quantity })
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    getCartItems();
                    setShowAlert('Item added to cart');
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Failed To Update Cart');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Failed To Update Cart');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Failed To Update Cart');
                }
            })
    }

    const removeCartItem = (id) => {
        setShowProgress(true);
        removeCart(id)
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    getCartItems();
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Failed To Update Cart');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Failed To Update Cart');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Failed To Update Cart');
                }
            })
    }

    const makeOrder = () => {
        setShowProgress(true);

        let cartIds = [];
        cartItems.forEach((item) => {
            cartIds.push(item.id);
        });

        placeOrder({ userId: user.id, cartIds })
            .then(res => {
                if(res.data.key === "SUCCESS") {
                    setShowAlert('Your order is successfully placed');
                    getCartItems();
                    navigate('/');
                }else{
                    console.log(res.data);
                    setShowAlert(res.data.error?res.data.error:'Failed To Update Cart');
                }
                setShowProgress(false);
            })
            .catch(error => {
                console.log(error);
                setShowProgress(false);
                if(typeof error.response.data.error === 'string') {
                    setShowAlert(error.response.data.error?error.response.data.error:'Failed To Update Cart');
                }else{
                    setShowAlert(error.response.data.key?error.response.data.key:'Failed To Update Cart');
                }
            })
    }

    return (
        <cartContext.Provider value={{ cartItems, setCartItems, getCartItems, increaseQuantity, decreaseQuantity, removeCartItem, addItemToCart, makeOrder }}>
            {children}
        </cartContext.Provider>
    )
}

export default CartState;