import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Payment() {
  const cart = useSelector((state) => state.cart.items);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cart.length === 0) {
      setCartProducts([]);
      return;
    }

    Promise.all(
      cart.map((item) =>
        fetch(`http://localhost:3000/products/id/${item.id}`)
          .then((res) => res.json())
          .then((product) => ({ ...product, quantity: item.quantity }))
          .catch((err) => {
            console.error(`Failed to fetch product ${item.id}:`, err);
            return null;
          })
      )
    ).then((results) => {
      const filtered = results.filter((r) => r !== null);
      setCartProducts(filtered);
    });
  }, [cart]);

  const totalAmount = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 mb-10 p-6 bg-white shadow-lg rounded">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Payment Details
        </h2>

        {cartProducts.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Cardholder Name"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="tel"
                placeholder="Card Number"
                maxLength={16}
                className="w-full border p-2 rounded"
                required
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-1/2 border p-2 rounded"
                  required
                />
                <input
                  type="password"
                  placeholder="CVV"
                  maxLength={3}
                  className="w-1/2 border p-2 rounded"
                  required
                />
              </div>
            </div>

            <div className="mt-6 text-lg font-medium flex justify-between">
              <span>Total Amount</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>

            <button
              className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              onClick={() => alert("✅ Payment Successful (mock)")}
            >
              Pay Now
            </button>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Payment;
