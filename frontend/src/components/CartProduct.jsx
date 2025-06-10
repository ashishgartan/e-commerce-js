import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useState, useEffect } from 'react';

function CartProduct({ product, updateQuantity, removeFromCart }) {
    const { id, title, price, mainImage } = product;
    const [quantity, setQuantity] = useState(product.quantity);

    // Keep local quantity in sync if product.quantity changes externally
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
        <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center text-center">
            <img
                src={mainImage}
                alt={title}
                className="w-32 h-32 object-cover mb-4 rounded-md"
            />
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-gray-600">Price: ₹{price}</p>
            <div className="flex items-center space-x-3 my-3">
                <button
                    className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
                    onClick={handleDecrease}
                >
                    −
                </button>

                <span className="text-lg font-medium">{quantity}</span>

                <button
                    className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600 transition"
                    onClick={handleIncrease}
                >
                    +
                </button>
            </div>

            <p className="text-green-600 font-medium mt-1">
                Total: ₹{(price * quantity).toFixed(2)}
            </p>
            <IconButton
                className="mt-3 text-red-500 hover:text-red-700"
                onClick={handleRemove}
            >
                <DeleteIcon />
            </IconButton>
        </div>
    );
}

export default CartProduct;
