import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Payment() {
    const cart = useSelector((state) => state.cart.items);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        Promise.all(
            cart.map(item =>
                fetch(`http://localhost:3000/products/id/${item.id}`)
                    .then(res => res.json())
                    .then(product => ({ ...product, quantity: item.quantity }))
            )
        ).then(setCartProducts);
    }, [cart]);

    const totalAmount = cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            <Navbar />
            <div className="max-w-xl mx-auto mt-10 mb-10 p-6 bg-white shadow-lg rounded">
                <h2 className="text-2xl font-semibold mb-6 text-center">Payment Details</h2>

                <div className="space-y-4">
                    <input type="text" placeholder="Cardholder Name" className="w-full border p-2 rounded" />
                    <input type="text" placeholder="Card Number" maxLength={16} className="w-full border p-2 rounded" />
                    <div className="flex gap-4">
                        <input type="text" placeholder="MM/YY" maxLength={5} className="w-1/2 border p-2 rounded" />
                        <input type="text" placeholder="CVV" maxLength={3} className="w-1/2 border p-2 rounded" />
                    </div>
                </div>

                <div className="mt-6 text-lg font-medium flex justify-between">
                    <span>Total Amount</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                </div>

                <button
                    className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    onClick={() => alert("Payment Successful (mock)")}
                >
                    Pay Now
                </button>
            </div>
            <Footer />
        </>
    );
}

export default Payment;
