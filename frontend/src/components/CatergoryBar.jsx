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
        <div className="bg-gray-100 px-4 py-2 flex space-x-4 overflow-x-auto">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    to={`/category/${category.name}`}
                    className="text-sm font-medium text-blue-600 hover:underline whitespace-nowrap"
                >
                    {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </Link>
            ))}
        </div>
    );
}

export default CategoryBar;
