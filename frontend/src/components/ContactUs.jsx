import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Here you can handle sending the message to your backend or email service
        console.log("Contact form submitted:", formData);
        setSubmitted(true);
    }

    return (
        <>
            <Navbar />
            <main className="max-w-2xl mx-auto p-6">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

                {submitted ? (
                    <p className="text-green-600 text-lg">Thank you for reaching out! We'll get back to you soon.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block mb-1 font-medium">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                )}
            </main>
            <Footer />
        </>
    );
}

export default Contact;
