import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import { Link } from "react-router-dom";

function Checkout() {
  const cart = useSelector((state) => state.cart.items);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (!cart.length) return setCartProducts([]);
    Promise.all(
      cart.map((item) =>
        fetch(`http://localhost:3000/api/product/${item._id}`)
          .then((res) => res.json())
          .then((product) => ({
            ...product,
            id: product._id, // normalize `_id` to `id`
            quantity: item.quantity,
          }))
      )
    ).then(setCartProducts);
  }, [cart]);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shipping Info */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Shipping Information
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Street, Building, etc."
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Mumbai"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="400001"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+91 9876543210"
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-500"
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Order Summary
            </h2>

            <OrderSummary cartProducts={cartProducts} />

            <Link
              to="/payment"
              className="mt-6 block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded"
            >
              Continue to Billing
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
