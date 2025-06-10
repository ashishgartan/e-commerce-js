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
        Promise.all(
            cart.map(item =>
                fetch(`http://localhost:3000/products/id/${item.id}`)
                    .then(res => res.json())
                    .then(product => ({ ...product, quantity: item.quantity }))
            )
        ).then(setCartProducts);
    }, [cart]);

    // const totalAmount = cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Shipping Details */}
                <div className="col-span-2 bg-white shadow-md p-6 rounded">
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    <form className="space-y-4">
                        <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" />
                        <input type="text" placeholder="Address" className="w-full border p-2 rounded" />
                        <input type="text" placeholder="City" className="w-full border p-2 rounded" />
                        <input type="text" placeholder="Postal Code" className="w-full border p-2 rounded" />
                        <input type="text" placeholder="Phone Number" className="w-full border p-2 rounded" />
                    </form>
                </div>

                {/* Order Summary */}
                <div>
                    <OrderSummary cartProducts={cartProducts} />
                    <Link className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition" to={"/payment"} >Billing</Link>
                </div>

            </div>
            <Footer />
        </>
    );
}

export default Checkout;
