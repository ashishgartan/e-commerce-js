import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./Product";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { fetchCartFromBackend } from "../store/cartSlice"; // add this

import {
  addToCart,
  removeFromCart,
  reduceQuantityFromCart,
  syncCartToBackend,
} from "../store/cartSlice";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState(null);
  const [mainImage, setMainImage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartLoaded = useSelector((state) => state.cart.cartLoaded);

  const limit = 10; // items per page
  const itemInCart = product
    ? cartItems.find((item) => item.id === product.id)
    : null;
  const quantity = itemInCart?.quantity || 0;

  // Load cart only once
  useEffect(() => {
    if (!cartLoaded) {
      console.log("⛳ Fetching cart from backend");
      console.log("Inside useEffect of ProductDetail");
      dispatch(fetchCartFromBackend());
    }
  }, [cartLoaded, dispatch]);

  // Load product when ID changes
  useEffect(() => {
    if (!id) return;
    console.log("Fetching product with ID:", id);
    fetch(`http://localhost:3000/products/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.mainImage);
        setCurrentPage(1);
      })
      .catch((err) => console.error("❌ Error fetching product:", err));
  }, [id]);

  // Fetch similar products when product changes
  useEffect(() => {
    console.log("Fetching similar products for category:", product?.category);
    if (!product?.category) return;
    fetchSimilarProducts(product.category, 1);
  }, [product]);

  // Fetch similar products
  const fetchSimilarProducts = (category, page) => {
    fetch(
      `http://localhost:3000/products/pagination/category/${category}?page=${page}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSimilarProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => console.error("Error fetching similar products:", err));
  };

  // Handle page change
  const handlePageChange = (direction) => {
    const newPage = currentPage + direction;
    if (product && newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchSimilarProducts(product.category, newPage);
    }
  };

  const updateBackend = (updatedCart) => {
    dispatch(syncCartToBackend(updatedCart));
  };

  const handleAddToCart = () => {
    const updatedCart = [...cartItems, { id: product.id, quantity: 1 }];
    dispatch(addToCart(product.id));
    updateBackend(updatedCart);
  };

  const handleIncrease = () => {
    const updatedCart = cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch(addToCart(product.id));
    updateBackend(updatedCart);
  };

  const handleDecrease = () => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    dispatch(reduceQuantityFromCart(product.id));
    updateBackend(updatedCart);
  };

  const handleRemoveFromCart = () => {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    dispatch(removeFromCart(product.id));
    updateBackend(updatedCart);
  };
  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-8 p-10 max-w-6xl mx-auto">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-4">
          {product.images.map((imageLink, index) => (
            <img
              key={index}
              src={imageLink}
              alt={`Thumbnail ${index + 1}`}
              onMouseEnter={() => setMainImage(imageLink)}
              onMouseLeave={() => setMainImage(product.mainImage)}
              className="w-16 h-16 object-cover border rounded-md cursor-pointer hover:ring-2"
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={mainImage}
            alt={product.title}
            className="max-w-sm w-full object-contain border rounded-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 bg-white p-6 shadow-md rounded-md">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-green-600 mb-2">₹{product.price}</p>
          <p className="text-gray-500 mb-2">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-gray-600">{product.description}</p>
          {itemInCart ? (
            <div className="flex items-center space-x-3 my-3">
              {/* Decrease and Increase buttons for quantity */}
              {quantity === 1 ? (
                <button
                  className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  onClick={handleRemoveFromCart}
                >
                  <DeleteForeverRoundedIcon />
                </button>
              ) : (
                <button
                  className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  onClick={handleDecrease}
                >
                  −
                </button>
              )}

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

          <button className="mt-6 mx-8 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Buy Now
          </button>
        </div>
      </div>

      {/* Similar Products */}
      <div className="px-10 border-t pt-8 mt-8">
        {similarProducts && similarProducts.length > 0 && (
          <>
            <h1 className="text-xl font-semibold mb-2">
              People also like it...
            </h1>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 gap-4">
              <button
                onClick={() => handlePageChange(-1)}
                disabled={currentPage === 1}
                className="bg-gray-200 px-4 py-1 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === totalPages}
                className="bg-gray-200 px-4 py-1 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="overflow-x-auto whitespace-nowrap p-4 bg-white rounded-md shadow-xl">
              {similarProducts
                .filter((p) => p.id !== parseInt(id))
                .map((p) => (
                  <div key={p.id} className="inline-block w-64 mr-4">
                    <Product product={p} />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;
