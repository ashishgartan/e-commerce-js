import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";

function CategoryProduct() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:3000/products/pagination/category/${category}?page=${pageNumber}&limit=${pageSize}`);
                const data = await res.json(); // Expected: { products: [...], total: number }
                setProducts(data.products);
                setTotalPages(Math.ceil(data.total / pageSize));
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [category, pageNumber]);

    if (loading) return <p className="p-4">Loading products...</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 capitalize">Products in {category}</h2>
            <ProductList products={products} />

            {/* Pagination Controls */}
            <div className="flex justify-center my-6 space-x-4">
                <button
                    onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                    disabled={pageNumber === 1}
                    className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-lg font-semibold">Page {pageNumber} of {totalPages}</span>
                <button
                    onClick={() => setPageNumber(prev => Math.min(totalPages, prev + 1))}
                    disabled={pageNumber === totalPages}
                    className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CategoryProduct;
