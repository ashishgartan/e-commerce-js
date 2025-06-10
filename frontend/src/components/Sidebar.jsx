import React, { useState } from "react";

const Sidebar = () => {
    const categories = ["Electronics", "Clothing", "Books", "Home"];
    const brands = ["Apple", "Nike", "Samsung", "Adidas"];

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    return (
        <div className="w-48 p-4 border-r border-gray-300">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <ul className="space-y-2">
                {categories.map((cat) => (
                    <li
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`cursor-pointer px-2 py-1 rounded ${selectedCategory === cat
                                ? "bg-indigo-600 text-white font-bold"
                                : "hover:bg-indigo-100"
                            }`}
                    >
                        {cat}
                    </li>
                ))}
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3">Brands</h3>
            <ul className="space-y-2">
                {brands.map((brand) => (
                    <li
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`cursor-pointer px-2 py-1 rounded ${selectedBrand === brand
                                ? "bg-indigo-600 text-white font-bold"
                                : "hover:bg-indigo-100"
                            }`}
                    >
                        {brand}
                    </li>
                ))}
            </ul>

            <div className="mt-6 text-sm">
                <p>
                    <strong>Selected:</strong>
                </p>
                <p>Category: {selectedCategory || "None"}</p>
                <p>Brand: {selectedBrand || "None"}</p>
            </div>
        </div>
    );
};

export default Sidebar;
