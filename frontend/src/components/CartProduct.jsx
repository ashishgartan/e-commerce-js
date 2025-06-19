import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { useState, useEffect } from "react";

function CartProduct({ product, updateQuantity, removeFromCart }) {
  const { _id, title, price, mainImage } = product;
  const [quantity, setQuantity] = useState(product.quantity);

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      updateQuantity(_id, newQty);
    }
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    updateQuantity(_id, newQty);
  };

  const handleRemove = () => {
    removeFromCart(_id);
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
          <IconButton
            onClick={handleDecrease}
            disabled={quantity <= 1}
            sx={{
              color: "red",
              transition: "color 0.3s",
              "&:hover": {
                color: "#b91c1c", // Tailwind red-700
              },
            }}
          >
            <RemoveIcon />
          </IconButton>
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
