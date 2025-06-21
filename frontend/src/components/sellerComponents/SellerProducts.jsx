import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SellerProducts = () => {
  const { userId } = useParams(); // seller's ID from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/seller/products/${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Error loading seller products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, [userId]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🛍️ My Products</h1>
        <Link
          to={`/seller/products/add/${userId}`}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          ➕ Add New Product
        </Link>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600">No products listed yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length &&
            products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg shadow hover:shadow-md bg-white p-4"
              >
                <img
                  src={product.image || "https://via.placeholder.com/100"}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
                <p className="text-gray-600">₹{product.price}</p>
                <p className="text-sm text-gray-500 mb-3">
                  Stock: {product.stock}
                </p>
                <div className="flex gap-2">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                    ✏️ Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
