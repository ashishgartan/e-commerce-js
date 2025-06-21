import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Payment() {
  const cart = useSelector((state) => state.cart.items);
  const [cartProducts, setCartProducts] = useState([]);

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

  return (
    <>
      <Footer />
    </>
  );
}

export default Payment;
