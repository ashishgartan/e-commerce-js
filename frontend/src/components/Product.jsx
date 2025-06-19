import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  reduceQuantityFromCart,
  syncCartToBackend,
} from "../store/cartSlice";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";

function Product({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const itemInCart = cartItems.find((item) => item?._id === product._id);
  const quantity = itemInCart?.quantity || 0;

  const updateBackend = (updatedCart) => {
    dispatch(syncCartToBackend(updatedCart));
  };

  const handleAddToCart = () => {
    const updatedCart = [...cartItems, { _id: product._id, quantity: 1 }];
    dispatch(addToCart(product._id));
    updateBackend(updatedCart);
  };

  const handleIncrease = () => {
    const updatedCart = cartItems.map((item) =>
      item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch(addToCart(product._id));
    updateBackend(updatedCart);
  };

  const handleDecrease = () => {
    const updatedCart = cartItems
      .map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    dispatch(reduceQuantityFromCart(product._id));
    updateBackend(updatedCart);
  };

  const handleRemoveFromCart = () => {
    const updatedCart = cartItems.filter((item) => item._id !== product._id);
    dispatch(removeFromCart(product._id));
    updateBackend(updatedCart);
  };

  return (
    <div className="border border-gray-200 rounded-xl shadow hover:shadow-lg transition-transform duration-300 bg-white p-4">
      {/* Product Image */}
      <img
        src={product.mainImage}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md mb-3"
      />

      {/* Product Info */}
      <h3 className="text-lg font-semibold text-gray-800 truncate">
        {product.title}
      </h3>
      <p className="text-gray-500 text-sm mb-1">{product.categoryId?.name}</p>
      <p className="text-green-600 font-semibold mb-1">₹{product.price}</p>
      <p className="text-yellow-500 text-sm">⭐ {product.rating}</p>

      {/* Buttons Section */}
      {itemInCart ? (
        <div className="flex items-center justify-center gap-3 mt-4">
          {quantity === 1 ? (
            <IconButton
              onClick={handleRemoveFromCart}
              sx={{
                color: "red",
                transition: "color 0.3s",
                "&:hover": {
                  color: "#b91c1c", // Tailwind red-700
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleDecrease}
              sx={{
                color: "red",
                transition: "color 0.3s",
                "&:hover": {
                  color: "#b91c1c",
                },
              }}
            >
              <RemoveIcon />
            </IconButton>
          )}

          <span className="text-lg font-medium">{quantity}</span>

          <IconButton
            onClick={handleIncrease}
            sx={{
              color: "green",
              transition: "color 0.3s",
              "&:hover": {
                color: "#047857", // Tailwind green-700
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </div>
      ) : (
        <button
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}

      {/* Link to product details */}
      <Link
        to={`/product/${product._id}`}
        className="block text-blue-500 hover:underline mt-3 text-sm text-center"
      >
        View Details →
      </Link>
    </div>
  );
}

export default Product;
