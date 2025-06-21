import React from "react";

const SellerOrders = () => {
  const dummyOrders = [
    {
      id: "ORD123",
      customer: "Ashish G.",
      product: "Bluetooth Headphones",
      date: "2025-06-20",
      amount: 2499,
      status: "Shipped",
    },
    {
      id: "ORD124",
      customer: "Sneha R.",
      product: "Smart Watch",
      date: "2025-06-19",
      amount: 3999,
      status: "Processing",
    },
    {
      id: "ORD125",
      customer: "Karan P.",
      product: "Laptop Stand",
      date: "2025-06-18",
      amount: 1299,
      status: "Delivered",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">📦 Seller Orders</h1>

      <div className="overflow-x-auto shadow rounded-lg border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {dummyOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">
                  {order.id}
                </td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3">{order.product}</td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3 font-medium">₹{order.amount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrders;
