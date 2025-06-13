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
      // If cart is not empty, fetch products from backend
      Promise.all(
        cart.items.map((item) =>
          fetch(`http://localhost:3000/products/id/${item?.id}`)
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
    }
  }, [cart.items, dispatch]);

  function updateQuantity(productId, newQuantity) {
    const updatedCart = cart.items
      .map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
      .filter((item) => item.quantity > 0);
    dispatch(setCart(updatedCart));
    dispatch(syncCartToBackend(updatedCart));
  }

  function removeFromCart(productId) {
    const updatedCart = cart.items.filter((item) => item.id !== productId);
    dispatch(setCart(updatedCart));
    dispatch(syncCartToBackend(updatedCart));
  }

  return (
    <>
      <Navbar />
      <section className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            🛒 Your Cart
          </h1>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left - Products */}
            <div className="lg:col-span-3 space-y-6">
              {cartProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 bg-white shadow rounded-lg">
                  <EmptyCart />
                  <Link
                    to="/"
                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                cartProducts.map((product) => (
                  <div key={product.id}>
                    <CartProduct
                      product={product}
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                    />
                  </div>
                ))
              )}
            </div>

            {/* Right - Summary */}
            {cartProducts.length === 0 ? null : (
              <div className="bg-white p-6 rounded-lg shadow h-fit sticky top-20">
                <OrderSummary cartProducts={cartProducts} />
                <Link
                  className="mt-6 block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                  to="/checkout"
                >
                  Proceed to Checkout →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Cart;
