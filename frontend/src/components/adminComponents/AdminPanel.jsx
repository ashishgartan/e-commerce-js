import React, { useState } from "react";

const AdminPage = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "", // This should be the category _id
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["price", "stock"].includes(name)) {
      setProduct((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImages = (e) => {
    const urls = e.target.value.split(",").map((url) => url.trim());
    setProduct((prev) => ({ ...prev, images: urls }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Product added successfully!");
      } else {
        alert("❌ Failed to add product: " + data.error);
      }
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  };

  const inputClass =
    "w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        🛠 Add Product
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {["name", "description", "category"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-gray-600 capitalize mb-1">{field}</label>
            <input
              className={inputClass}
              type="text"
              name={field}
              value={product[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {["price", "stock"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-gray-600 capitalize mb-1">{field}</label>
            <input
              className={inputClass}
              type="number"
              name={field}
              value={product[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">
            🖼️ Images (comma-separated URLs)
          </label>
          <textarea
            rows={2}
            className={`${inputClass} resize-none`}
            value={product.images.join(", ")}
            onChange={handleImages}
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold shadow"
          >
            ➕ Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPage;
