// src/components/OrderSummary.jsx
function OrderSummary({ cartProducts }) {
  const total = cartProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 h-fit">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      {cartProducts.length === 0 ? (
        <p className="text-gray-500 text-sm">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2 text-gray-700">
            {cartProducts.map((p) => (
              <li key={p.id} className="flex justify-between">
                <span className="truncate w-3/5">
                  {p.title.slice(0, 20)}...
                </span>
                <span>
                  ₹{p.price} × {p.quantity}
                </span>
              </li>
            ))}
          </ul>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <hr className="my-4" />
        </>
      )}
    </div>
  );
}

export default OrderSummary;
