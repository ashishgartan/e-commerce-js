import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartFromBackend,
  setCart,
  syncCartToBackend,
} from "../store/cartSlice";
import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import EmptyCart from "./EmptyCart";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (!cart.cartLoaded) {
      dispatch(fetchCartFromBackend());
    }
  }, [cart.cartLoaded, dispatch]);

  useEffect(() => {
    if (cart.items.length !== 0) {
      Promise.all(
        cart.items.map((item) =>
          fetch(`http://localhost:3000/api/product/${item?._id}`)
            .then((res) => {
              if (!res.ok) throw new Error("Failed to load product");
              return res.json();
            })
            .then((product) => ({ ...product, quantity: item.quantity }))
        )
      )
        .then((products) => {
          setCartProducts(products);
        })
        .catch((error) => {
          console.error(error);
          setCartProducts([]);
        });
    } else {
      setCartProducts([]);
    }
  }, [cart.items]);

  function updateQuantity(productId, newQuantity) {
    const updatedCart = cart.items
      .map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
      .filter((item) => item.quantity > 0);
    dispatch(setCart(updatedCart));
    dispatch(syncCartToBackend(updatedCart));
  }

  function removeFromCart(productId) {
    const updatedCart = cart.items.filter((item) => item._id !== productId);
    dispatch(setCart(updatedCart));
    dispatch(syncCartToBackend(updatedCart));
  }

  return (
    <>
      <section className="bg-gray-100 min-h-screen py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            🛒 Your Cart
          </h1>

          {cartProducts.length === 0 ? (
            <div className="flex justify-center">
              <div className="w-full max-w-xl bg-white shadow rounded-lg p-6">
                <EmptyCart />
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row justify-center gap-8">
              {/* Left - Products */}
              <div className="w-full lg:w-2/3 space-y-6">
                {cartProducts.map((product) => (
                  <CartProduct
                    key={product._id}
                    product={product}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </div>

              {/* Right - Summary */}
              <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow h-fit sticky top-20">
                <OrderSummary cartProducts={cartProducts} />
                <Link
                  className="mt-6 block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                  to="/checkout"
                >
                  Proceed to Checkout →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Cart;
