import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoryPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        All Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            to={`/category/${category._id}`}
            key={category._id}
            className="bg-white border shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={category.image || "https://via.placeholder.com/300x200"}
              alt={category.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-bold text-indigo-700 mb-1">
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </h3>
            <p className="text-gray-600 text-sm">
              {category.description || "No description provided."}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
