import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartFromBackend, setCart, syncCartToBackend } from '../store/cartSlice';
import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import EmptyCart from "./EmptyCart";

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        if (cart.length === 0) {
            dispatch(fetchCartFromBackend());
        }

        Promise.all(
            cart.map(item =>
                fetch(`http://localhost:3000/products/id/${item.id}`)
                    .then(res => {
                        if (!res.ok) throw new Error("Failed to load product");
                        return res.json();
                    })
                    .then(product => ({ ...product, quantity: item.quantity }))
            )
        )
            .then(products => {
                setCartProducts(products);
            })
            .catch(error => {
                console.error(error);
                setCartProducts([]);
            });
    }, [cart, dispatch]);

    function updateQuantity(productId, newQuantity) {
        const updatedCart = cart.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        ).filter(item => item.quantity > 0);
        dispatch(setCart(updatedCart));
        dispatch(syncCartToBackend(updatedCart));
    }

    function removeFromCart(productId) {
        const updatedCart = cart.filter(item => item.id !== productId);
        dispatch(setCart(updatedCart));
        dispatch(syncCartToBackend(updatedCart));
    }

    return (
        <>
            <Navbar />
            <h1 className="text-3xl font-bold p-6">Your Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-6 pb-6">
                {/* Products Area */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cartProducts.length === 0 ? (
                        // <p className="text-lg col-span-full">Cart is empty</p>
                        <EmptyCart/>
                    ) : (
                        cartProducts.map(product => (
                            <CartProduct
                                key={product.id}
                                product={product}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                            />
                        ))
                    )}
                </div>

                {/* Total Bill Area */}
                <div>
                    <OrderSummary cartProducts={cartProducts} />
                    <Link className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition" to={"/checkout"} >Checkout</Link>
                </div>

            </div>

            <Footer />
        </>
    );
}

export default Cart;
