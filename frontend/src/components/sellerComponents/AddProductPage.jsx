import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AddProductPage = () => {
  const { userId } = useParams();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    stock: "",
    categoryId: "",
    newCategory: "",
    mainImage: "",
    images: [""],
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/category")
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("❌ Error fetching categories", err));
  }, []);

  const handleChange = (e) => {
    const { title, value } = e.target;
    setForm((prev) => ({ ...prev, [title]: value }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...form.images];
    updatedImages[index] = value;
    setForm((prev) => ({ ...prev, images: updatedImages }));
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let categoryId = form.categoryId;

      // If new category provided, create it first
      if (form.newCategory.trim()) {
        const res = await fetch("http://localhost:3000/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: form.newCategory.trim() }),
        });

        if (!res.ok) throw new Error("Failed to create new category");

        const newCat = await res.json();
        categoryId = newCat._id;
      }

      const payload = {
        title: form.title,
        price: Number(form.price),
        stock: Number(form.stock),
        mainImage: form.mainImage,
        images: form.images.filter((img) => img.trim() !== ""),
        categoryId,
      };

      const response = await fetch(
        `http://localhost:3000/api/seller/products/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to add product");

      const data = await response.json();
      console.log("✅ Product added:", data);
      alert("✅ Product added successfully!");

      setForm({
        title: "",
        price: "",
        stock: "",
        categoryId: "",
        newCategory: "",
        mainImage: "",
        images: [""],
      });
    } catch (err) {
      console.error("❌ Failed to add product", err);
      alert("❌ Something went wrong while adding the product");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">➕ Add New Product</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          title="title"
          placeholder="Product Name"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          title="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          title="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Category Select */}
        <div>
          <label className="block text-sm mb-1 text-gray-700 font-medium">
            🗂️ Category
          </label>
          <select
            title="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mb-2"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* New Category Input */}
        <input
          title="newCategory"
          placeholder="Or create a new category..."
          value={form.newCategory}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        {/* Main Image */}
        <div>
          <label className="block text-sm mb-1 text-gray-700 font-medium">
            🖼️ Main Image URL
          </label>
          <input
            title="mainImage"
            value={form.mainImage}
            onChange={handleChange}
            placeholder="https://example.com/main.jpg"
            className="w-full border px-3 py-2 rounded"
          />
          {form.mainImage && (
            <img
              src={form.mainImage}
              alt="preview"
              className="mt-2 w-32 h-32 object-cover rounded border"
            />
          )}
        </div>

        {/* Additional Images */}
        <div>
          <label className="block text-sm mb-1 text-gray-700 font-medium">
            📷 Additional Images
          </label>
          {form.images.map((img, i) => (
            <div key={i} className="mb-2">
              <input
                value={img}
                onChange={(e) => handleImageChange(i, e.target.value)}
                placeholder={`Image URL ${i + 1}`}
                className="w-full border px-3 py-2 rounded"
              />
              {img && (
                <img
                  src={img}
                  alt={`img-${i}`}
                  className="mt-1 w-24 h-24 object-cover border rounded"
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="text-blue-600 text-sm hover:underline mt-1"
          >
            ➕ Add Another Image
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
