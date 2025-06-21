// src/components/sellerComponents/SellerDashboard.jsx
import React from "react";

const SellerDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">📊 Seller Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow p-5 rounded border">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl font-bold text-blue-600 mt-2">23</p>
        </div>
        <div className="bg-white shadow p-5 rounded border">
          <h2 className="text-lg font-semibold">Orders This Month</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">58</p>
        </div>
        <div className="bg-white shadow p-5 rounded border">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl font-bold text-purple-600 mt-2">₹1,12,000</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
        <ul className="border rounded divide-y">
          {["Order #1234", "Order #1235", "Order #1236"].map((order) => (
            <li key={order} className="p-4 hover:bg-gray-50">
              🛒 {order} - ₹1999 - <span className="text-green-600">Paid</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SellerDashboard;
