import Product from "./Product";

function ProductList({ products }) {
  if (!products || products.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">No products found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
