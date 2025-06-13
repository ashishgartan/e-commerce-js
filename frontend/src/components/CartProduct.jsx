import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useState, useEffect } from "react";

function CartProduct({ product, updateQuantity, removeFromCart }) {
  const { id, title, price, mainImage } = product;
  const [quantity, setQuantity] = useState(product.quantity);

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      updateQuantity(id, newQty);
    }
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    updateQuantity(id, newQty);
  };

  const handleRemove = () => {
    removeFromCart(id);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start justify-between p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
      {/* Product Image */}
      <img
        src={mainImage}
        alt={title}
        className="w-32 h-32 object-cover rounded-lg border"
      />

      {/* Details */}
      <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-500 mt-1">Price: ₹{price}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-3">
          <button
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold text-red-600 transition"
            onClick={handleDecrease}
          >
            −
          </button>

          <span className="text-lg font-medium">{quantity}</span>

          <button
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold text-green-600 transition"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>

        {/* Total */}
        <p className="text-green-600 font-medium mt-2">
          Total: ₹{(price * quantity).toFixed(2)}
        </p>
      </div>

      {/* Delete Button */}
      <div className="mt-3 sm:mt-0 sm:ml-4">
        <IconButton
          onClick={handleRemove}
          className="!text-red-500 hover:!text-red-700 transition"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default CartProduct;
