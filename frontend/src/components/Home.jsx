import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartFromBackend } from "../store/cartSlice";
import ProductList from "./ProductList";
import CategoryBar from "./CatergoryBar";
import Sidebar from "./Sidebar";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.cart.status);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(
      `http://localhost:3000/products/pagination?page=${pageNumber}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setPageNumber(data.page);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [pageNumber]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCartFromBackend());
    }
  }, [status, dispatch]);

  return (
    <>
      <Navbar />

      <div className="flex max-w-7xl mx-auto px-4 py-6 gap-8">
        <Sidebar />

        <div className="flex-1">
          <CategoryBar />

          {loading && (
            <div className="text-center text-gray-600 py-6">
              Loading products...
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 py-6">{error}</div>
          )}

          {!loading && !error && <ProductList products={products} />}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center my-8 space-x-6">
        <button
          onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
          disabled={pageNumber === 1}
          className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-lg font-medium text-gray-700">
          Page {pageNumber} of {totalPages}
        </span>

        <button
          onClick={() =>
            setPageNumber((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={pageNumber === totalPages}
          className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <Footer />
    </>
  );
}

export default Home;
