import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoryBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white shadow-md px-4 py-3 overflow-x-auto border-b">
      <div className="flex gap-3 sm:gap-4 items-center whitespace-nowrap min-w-full">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.name}`}
            className="bg-indigo-100 text-indigo-700 text-sm sm:text-base px-4 py-2 rounded-full hover:bg-indigo-200 transition font-medium"
          >
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;
