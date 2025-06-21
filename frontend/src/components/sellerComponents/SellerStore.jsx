import React from "react";
import { Link, useParams } from "react-router-dom";

const SellerStore = () => {
  const { userId } = useParams();

  const links = [
    { label: "Dashboard", path: `/seller/dashboard/${userId}` },
    { label: "My Products", path: `/seller/products/${userId}` },
    { label: "Orders", path: `/seller/orders/${userId}` },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Seller Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.path}
            className="block bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-300 p-4 rounded-lg shadow-sm text-center transition"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SellerStore;
