import Navbar from "./Navbar";
import Footer from "./Footer";

function About() {
  return (
    <>
      <main className="max-w-4xl mx-auto p-6">
        <section className="bg-white rounded-xl shadow-md p-8 transition hover:shadow-lg">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-6 border-b pb-2 border-gray-200">
            🛍️ About Us
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Welcome to our store! We're passionate about delivering the best
            products and top-notch service. Our goal is to ensure every customer
            finds joy and value in every purchase they make.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Since our founding in <strong>2023</strong>, we’ve grown
            rapidly—thanks to our amazing customers and a team that’s dedicated
            to quality, innovation, and care.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            🌟 Thank you for choosing us. We're excited to keep serving you with
            excellence and heart!
          </p>
        </section>
      </main>
    </>
  );
}

export default About;
