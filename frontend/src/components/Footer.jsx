function Footer() {
  return (
    <footer className=" bottom-0 left-0 w-full bg-gray-900 text-gray-300 py-10 px-6 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and About */}
        <div>
          <h2 className="text-white text-xl font-bold mb-3">ShopZone</h2>
          <p className="text-sm">Your one-stop shop for all things fashion, tech, and lifestyle.</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/products" className="hover:underline">Products</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-white font-semibold mb-3">Policies</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Refund Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-3">Newsletter</h3>
          <p className="text-sm mb-3">Stay updated with our latest offers</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-r hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} ShopZone. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
