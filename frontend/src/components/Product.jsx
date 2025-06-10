import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, syncCartToBackend } from '../store/cartSlice';

function Product({ product }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const itemInCart = cartItems.find(item => item.id === product.id);
    const quantity = itemInCart?.quantity || 0;

    const updateBackend = (updatedCart) => {
        dispatch(syncCartToBackend(updatedCart));
    };

    const handleAddToCart = () => {
        const updatedCart = [...cartItems, { id: product.id, quantity: 1 }];
        dispatch(addToCart(product.id));
        updateBackend(updatedCart);
    };

    const handleIncrease = () => {
        const updatedCart = cartItems.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        dispatch(addToCart(product.id));
        updateBackend(updatedCart);
    };

    const handleDecrease = () => {
        const updatedCart = cartItems
            .map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter(item => item.quantity > 0);
        dispatch(removeFromCart(product.id));
        updateBackend(updatedCart);
    };

    return (
        <div className="border border--500 rounded-lg shadow hover:shadow-lg transition duration-300 bg-white p-4">
            <img
                src={product.mainImage}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-500 text-sm mb-1">{product.category}</p>
            <p className="text-green-600 font-semibold mb-1">₹{product.price}</p>
            <p className="text-yellow-500 text-sm">⭐ {product.rating}</p>

            {itemInCart ? (
                <div className="flex items-center space-x-3 my-3">
                    <button
                        className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        onClick={handleDecrease}
                    >
                        −
                    </button>
                    <span className="text-lg font-medium">{quantity}</span>
                    <button
                        className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
                        onClick={handleIncrease}
                    >
                        +
                    </button>
                </div>
            ) : (
                <button
                    className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700"
                    onClick={handleAddToCart}
                >
                    Add to cart
                </button>
            )}

            <Link to={'/product/' + product.id}>More Details</Link>
        </div>
    );
}

export default Product;