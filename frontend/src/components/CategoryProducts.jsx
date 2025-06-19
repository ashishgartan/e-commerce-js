import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";

function CategoryProduct() {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/product?categoryId=${categoryId}&page=${pageNumber}&limit=${pageSize}`
        );
        const data = await res.json();

        setProducts(data.products || []);
        setTotalPages(Math.ceil(data.total / pageSize));
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    const fetchCategoryName = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/category/${categoryId}`
        );
        const data = await res.json();
        console.log("Category Data:", data);
        setCategoryName(data.name || "Unknown Category");
      } catch (error) {
        console.error("Failed to fetch category name:", error);
        setCategoryName("Unknown Category");
      }
    };
    fetchCategoryName();
    fetchCategoryProducts();
  }, [categoryId, pageNumber]);

  if (loading) {
    return (
      <div className="p-10 flex justify-center items-center">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 capitalize border-b pb-2 border-gray-300">
        {categoryName} Products
      </h2>

      <ProductList products={products} />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-4">
          <button
            onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
            disabled={pageNumber === 1}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>

          <span className="text-lg font-semibold text-gray-700">
            Page {pageNumber} of {totalPages}
          </span>

          <button
            onClick={() =>
              setPageNumber((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={pageNumber === totalPages}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryProduct;
