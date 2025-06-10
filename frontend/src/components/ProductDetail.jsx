import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./Product";
import Footer from './Footer'
import Navbar from "./Navbar";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState(null);
    const [mainImage, setMainImage] = useState();

    useEffect(() => {
        fetch(`http://localhost:3000/products/id/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data); setMainImage(data.mainImage);
                console.log(data.category)
                fetch(`http://localhost:3000/products/category/${data.category}`)
                    .then(res => res.json())
                    .then(data => { setSimilarProducts(data) })
                    .catch(err => console.error("Error fetching similar product:", err));
            })
            .catch(err => console.error("Error fetching product:", err));
    }, [id]);

    if (!product) return <p className="text-center mt-10">Loading product...</p>;

    return (
        <>
            <Navbar />
            <div className="flex flex-col md:flex-row gap-8 p-10 max-w-6xl mx-auto">
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-4">
                    {product.images.map((imageLink, index) => (
                        <img
                            key={index}
                            src={imageLink}
                            alt={`Thumbnail ${index + 1}`}
                            onMouseEnter={() => setMainImage(imageLink)} // simulate switching
                            onMouseLeave={() => setMainImage(product.mainImage)} // simulate switching

                            className="w-16 h-16 object-cover border rounded-md cursor-pointer hover:ring-2" />
                    ))}
                </div>

                {/* Main Image */}
                <div className="flex-1 flex justify-center items-center">
                    <img
                        src={mainImage}
                        alt={product.title}
                        className="max-w-sm w-full object-contain border rounded-md"
                    />
                </div>

                {/* Product Info */}
                <div className="flex-1 bg-white p-6 shadow-md rounded-md">
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <p className="text-xl text-green-600 mb-2">₹{product.price}</p>
                    <p className="text-gray-500 mb-2">
                        <strong>Category:</strong> {product.category}
                    </p>
                    <p className="text-gray-600">{product.description}</p>
                    <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add to Cart
                    </button>
                    <button className="mt-6 mx-8 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Buy Now
                    </button>
                </div>
            </div>
            <div>
                {similarProducts && similarProducts.length > 0 && (
                    <>
                        <h1 className="text-xl font-semibold mb-2">People also like it...</h1>
                        <div className="flex space-x-4 shadow-xl p-4 bg-white rounded-md">
                            {similarProducts
                                .filter((product) => product.id !== parseInt(id))
                                .map((product) => (
                                    <Product key={product.id} product={product} />
                                ))}
                        </div>
                    </>
                )}
                

            </div>
            <Footer />

        </>

    );
}

export default ProductDetail;
