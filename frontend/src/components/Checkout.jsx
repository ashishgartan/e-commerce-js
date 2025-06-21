import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import { Link, useParams } from "react-router-dom";
import { syncCartToBackend } from "../store/cartSlice";
import { clearCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";

function Checkout() {
  const buyNowProductId = useParams().productId; // Get buyNowProductId from URL params
  console.log("buyNowProductId", buyNowProductId);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.items);
  const [cartProducts, setCartProducts] = useState([]);
  const [method, setMethod] = useState("card");

  const totalAmount = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [billingInfo, setBillingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [sameAsShipping, setSameAsShipping] = useState(false);

  const handleMockPayment = () => {
    const orderDetails = {
      shippingInfo,
      billingInfo,
      paymentMethod: method,
      totalAmount,
      items: cartProducts.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        priceAtPurchase: item.price,
      })),
    };

    // 🧾 Dummy confirmation alert
    const confirmed = window.confirm(
      `🧾 Confirm Your Order:\n
        Payment Method: ${method.toUpperCase()}
        Total Amount: ₹${totalAmount.toFixed(2)}
        \nProceed with this mock order?`
    );

    if (!confirmed) {
      alert("❌ Payment Cancelled.");
      return;
    }

    alert(`✅ Payment Successful via ${method.toUpperCase()} (mock)`);
    console.log("Order Details:", orderDetails);

    // 🔁 Optional: send to backend / clear cart / navigate
    // Example: navigate("/success");
    fetch(`http://localhost:3000/api/order/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Order placed successfully:", data);
        if (!buyNowProductId) {
          // Clear cart after successful payment
          dispatch(clearCart()); // Assuming you have a clearCart action
          dispatch(syncCartToBackend([])); // Sync empty cart to backend
          // navigate("/home"); // Redirect to home or order confirmation page
          // Optionally clear cart or redirect
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("❌ Error placing order. Please try again.");
      });

    alert("✅ Order placed successfully! Thank you for shopping with us.");
  };
  const updateBuyNowQuantity = (delta) => {
    setCartProducts((prev) => {
      const product = prev[0];
      const newQty = Math.max(1, product.quantity + delta); // Prevent quantity < 1
      return [{ ...product, quantity: newQty }];
    });
  };

  // 🧠 Load either cart or buy-now item
  useEffect(() => {
    if (buyNowProductId) {
      // 👇 Buy now mode: fetch that product only
      fetch(`http://localhost:3000/api/product/${buyNowProductId}`)
        .then((res) => res.json())
        .then((product) =>
          setCartProducts([
            {
              ...product,
              quantity: 1, // Default quantity = 1 for buy now
            },
          ])
        )
        .catch((err) => {
          console.error("Error loading buy now product", err);
          setCartProducts([]);
        });
    } else {
      // 🛒 Normal cart mode
      if (!cart.length) return setCartProducts([]);
      Promise.all(
        cart.map((item) =>
          fetch(`http://localhost:3000/api/product/${item._id}`)
            .then((res) => res.json())
            .then((product) => ({
              ...product,
              quantity: item.quantity,
            }))
        )
      ).then(setCartProducts);
    }
  }, [cart, buyNowProductId]);

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
              {[
                {
                  label: "Full Name",
                  placeholder: "John Doe",
                  key: "fullName",
                },
                {
                  label: "Address",
                  placeholder: "Street, Building, etc.",
                  key: "address",
                },
                { label: "City", placeholder: "Mumbai", key: "city" },
                {
                  label: "Postal Code",
                  placeholder: "400001",
                  key: "postalCode",
                },
                {
                  label: "Phone Number",
                  placeholder: "+91 9876543210",
                  key: "phone",
                },
              ].map(({ label, placeholder, key }) => (
                <div key={key}>
                  <label className="block text-sm text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-500"
                    onChange={(e) =>
                      setShippingInfo((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))}
            </form>
            {/* Checkbox to sync billing with shipping */}
            <div className="mt-6">
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSameAsShipping(checked);
                    if (checked) {
                      setBillingInfo({ ...shippingInfo });
                    }
                  }}
                />
                <span className="text-sm text-gray-700">
                  Billing same as shipping
                </span>
              </label>
            </div>

            {/* Billing Info Section */}
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
              Billing Information
            </h2>

            <form className="space-y-4">
              {[
                {
                  label: "Full Name",
                  placeholder: "John Doe",
                  key: "fullName",
                },
                {
                  label: "Address",
                  placeholder: "Street, Building, etc.",
                  key: "address",
                },
                { label: "City", placeholder: "Mumbai", key: "city" },
                {
                  label: "Postal Code",
                  placeholder: "400001",
                  key: "postalCode",
                },
                {
                  label: "Phone Number",
                  placeholder: "+91 9876543210",
                  key: "phone",
                },
              ].map(({ label, placeholder, key }) => (
                <div key={key}>
                  <label className="block text-sm text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-500"
                    value={billingInfo[key]}
                    onChange={(e) =>
                      setBillingInfo((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    disabled={sameAsShipping}
                  />
                </div>
              ))}
            </form>
          </div>
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            {buyNowProductId ? (
              <div>
                <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                <div className="border rounded p-4 flex items-center gap-4">
                  <img
                    src={cartProducts[0]?.mainImage}
                    alt={cartProducts[0]?.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      {cartProducts[0]?.title}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      ₹{cartProducts[0]?.price?.toFixed(2)}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateBuyNowQuantity(-1)}
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        −
                      </button>
                      <span>{cartProducts[0]?.quantity}</span>
                      <button
                        onClick={() => updateBuyNowQuantity(1)}
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                {/* Total */}
                <div className="mt-4 text-right font-semibold text-blue-700">
                  Total: ₹{totalAmount.toFixed(2)}
                </div>
              </div>
            ) : (
              <OrderSummary cartProducts={cartProducts} />
            )}

            <Link
              to="/home"
              className="mt-6 block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded"
            >
              Continue shopping
            </Link>
            {!buyNowProductId && (
              <Link
                to="/cart"
                className="mt-6 block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded"
              >
                Back to cart
              </Link>
            )}
          </div>
        </div>
        {/**Payment methods */}
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
      </div>
    </>
  );
}

export default Checkout;
