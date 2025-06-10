import Navbar from "./Navbar";
import Footer from "./Footer";

function About() {
    return (
        <>
            <Navbar />
            <main className="max-w-4xl mx-auto p-6">
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-lg mb-6">
                    Welcome to our store! We are passionate about providing the best products and service for our customers.
                    Our mission is to deliver quality and value in every purchase.
                </p>
                <p className="text-lg mb-6">
                    Founded in 2023, we have quickly grown into a trusted brand thanks to our dedicated team and loyal customers.
                    We strive for excellence and innovation in everything we do.
                </p>
                <p className="text-lg">
                    Thank you for choosing us. We look forward to serving you!
                </p>
            </main>
            <Footer />
        </>
    );
}

export default About;
