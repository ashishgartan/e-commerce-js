import { useEffect, useState } from 'react'
import Product from './Product';
import Footer from './Footer'
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartFromBackend } from '../store/cartSlice';
import ProductList from './ProductList';
import CategoryBar from './CatergoryBar';
import Sidebar from './Sidebar';

function Home() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const status = useSelector((state) => state.cart.status);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3000/products/pagination?page=${pageNumber}&limit=10`)
            .then(res => res.json())
            .then((data) => {
                setPageNumber(data.page);
                setProducts(data.products);
                setTotalPages(data.totalPages);
            })
            .catch(console.error);
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
                    <ProductList products={products} />
                </div>
            </div>


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

            <Footer />
        </>
    )
}
export default Home;
