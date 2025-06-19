import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Payment() {
  const cart = useSelector((state) => state.cart.items);
  const [cartProducts, setCartProducts] = useState([]);
  const [method, setMethod] = useState("card");

  useEffect(() => {
    if (cart.length === 0) return setCartProducts([]);
    Promise.all(
      cart.map((item) =>
        fetch(`http://localhost:3000/api/product/${item._id}`)
          .then((res) => res.json())
          .then((product) => ({
            ...product,
            quantity: item.quantity,
          }))
          .catch(() => null)
      )
    ).then((results) =>
      setCartProducts(results.filter((item) => item !== null))
    );
  }, [cart]);

  const totalAmount = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleMockPayment = () => {
    alert(`✅ Payment Successful via ${method.toUpperCase()} (mock)`);
    // Optionally navigate to success page or clear cart
  };

  return (
    <>
      <div className="max-w-xl mx-auto mt-10 mb-10 p-6 bg-white shadow-lg rounded">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Choose Payment Method
        </h2>

        {/* Payment Method Tabs */}
        <div className="flex gap-2 mb-4 justify-center flex-wrap">
          {["card", "upi", "cod", "netbanking"].map((m) => (
            <button
              key={m}
              className={`px-4 py-2 rounded-full border ${
                method === m
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setMethod(m)}
            >
              {m === "card"
                ? "Credit / Debit Card"
                : m === "upi"
                ? "UPI"
                : m === "cod"
                ? "Cash on Delivery"
                : "Netbanking"}
            </button>
          ))}
        </div>

        {cartProducts.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            {method === "card" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full border p-2 rounded"
                />
                <input
                  type="tel"
                  placeholder="Card Number"
                  maxLength={16}
                  className="w-full border p-2 rounded"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-1/2 border p-2 rounded"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength={3}
                    className="w-1/2 border p-2 rounded"
                  />
                </div>
              </div>
            )}

            {method === "upi" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g. name@upi)"
                  className="w-full border p-2 rounded"
                />
              </div>
            )}

            {method === "netbanking" && (
              <div className="space-y-4">
                <select className="w-full border p-2 rounded">
                  <option>Select Bank</option>
                  <option>State Bank of India</option>
                  <option>ICICI Bank</option>
                  <option>HDFC Bank</option>
                  <option>Axis Bank</option>
                </select>
              </div>
            )}

            {method === "cod" && (
              <p className="text-gray-700 text-sm mt-4">
                You will pay in cash when the product is delivered.
              </p>
            )}

            <div className="mt-6 text-lg font-medium flex justify-between">
              <span>Total Amount</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>

            <button
              className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              onClick={handleMockPayment}
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
