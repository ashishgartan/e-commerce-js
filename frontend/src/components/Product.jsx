// React Router Link component lets you navigate without full page reload
import { Link } from "react-router-dom";

// Redux hooks to dispatch actions and access state
import { useDispatch, useSelector } from "react-redux";

// Material UI icon for delete button
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

// Importing action creators from our cart slice
import {
  addToCart,
  removeFromCart,
  reduceQuantityFromCart,
  syncCartToBackend,
} from "../store/cartSlice";

// Product component receives a `product` object via props
function Product({ product }) {
  const dispatch = useDispatch(); // Used to send actions to Redux store

  // Accessing cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Find the specific product in the cart (if it's already added)
  const itemInCart = cartItems.find((item) => item?.id === product.id);

  // Get the quantity of the item in the cart; default to 0 if not found
  const quantity = itemInCart?.quantity || 0;

  // Utility function to sync the current cart state to backend
  const updateBackend = (updatedCart) => {
    dispatch(syncCartToBackend(updatedCart)); // Async thunk handles API call
  };

  // Add new product to cart (if not already present)
  const handleAddToCart = () => {
    // Create updated cart for syncing
    const updatedCart = [...cartItems, { id: product.id, quantity: 1 }];

    dispatch(addToCart(product.id)); // Redux reducer increases quantity or adds item
    updateBackend(updatedCart); // Sync latest state to backend
  };

  // Increase quantity of a product in cart
  const handleIncrease = () => {
    const updatedCart = cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );

    dispatch(addToCart(product.id)); // Use same addToCart for incrementing
    updateBackend(updatedCart);
  };

  // Decrease quantity or remove item if quantity becomes 0
  const handleDecrease = () => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // Filter out 0 quantity items

    dispatch(reduceQuantityFromCart(product.id)); // Reducer decreases quantity
    updateBackend(updatedCart);
  };

  // Remove the product entirely from cart
  const handleRemoveFromCart = () => {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);

    dispatch(removeFromCart(product.id)); // Remove from Redux store
    updateBackend(updatedCart);
  };

  // Main UI rendering
  return (
    <div className="border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300 bg-white p-4">
      {/* Product Image */}
      <img
        src={product.mainImage}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md mb-3"
      />

      {/* Product Title */}
      <h3 className="text-lg font-semibold">{product.title}</h3>

      {/* Product Category */}
      <p className="text-gray-500 text-sm mb-1">{product.category}</p>

      {/* Price */}
      <p className="text-green-600 font-semibold mb-1">₹{product.price}</p>

      {/* Rating */}
      <p className="text-yellow-500 text-sm">⭐ {product.rating}</p>

      {/* Conditional rendering based on item presence in cart */}
      {itemInCart ? (
        <div className="flex items-center space-x-3 my-3">
          {/* Show remove icon if quantity is 1 */}
          {quantity === 1 ? (
            <button
              aria-label="Remove item"
              className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
              onClick={handleRemoveFromCart}
            >
              <DeleteForeverRoundedIcon fontSize="small" />
            </button>
          ) : (
            // Show minus button if quantity > 1
            <button
              aria-label="Decrease quantity"
              className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-red-600"
              onClick={handleDecrease}
            >
              −
            </button>
          )}

          {/* Quantity display */}
          <span className="text-lg font-medium">{quantity}</span>

          {/* Increase quantity button */}
          <button
            aria-label="Increase quantity"
            className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-green-600"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
      ) : (
        // Show "Add to Cart" if item not yet in cart
        <button
          className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}

      {/* Link to product detail page */}
      <Link
        to={`/product/${product.id}`}
        className="block text-blue-500 hover:underline mt-2 text-sm"
      >
        More Details
      </Link>
    </div>
  );
}

// Export this component for use in product listing/grid
export default Product;
