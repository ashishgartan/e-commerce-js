import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./components/ProductDetail.jsx";
import NotFound from "./components/NotFound.jsx";
import Home from "./components/Home.jsx";
import "./App.css";
import Cart from "./components/Cart.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Checkout from "./components/Checkout.jsx";
import About from "./components/About.jsx";
import ContactUs from "./components/ContactUs.jsx";
import PaymentPage from "./components/PaymentPage.jsx";
import CategoryProducts from "./components/CategoryProducts.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // ✅ Add
import AdminPage from "./components/adminComponents/AdminPanel.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AdminPanel from "./components/adminComponents/AdminPanel.jsx";
import SellerStore from "./components/sellerComponents/SellerStore.jsx";
import SellerDashboard from "./components/sellerComponents/SellerDashBoard.jsx";
import SellerOrders from "./components/sellerComponents/SellerOrders.jsx";
import SellerProducts from "./components/sellerComponents/SellerProducts.jsx";
import AddProductPage from "./components/sellerComponents/AddProductPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* ✅ Protected Routes */}

        <Route
          path="/adminPanel"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/:productId"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/sellerStore/:userId"
          element={
            <ProtectedRoute>
              <SellerStore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard/:userId"
          element={
            <ProtectedRoute>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/products/:userId"
          element={
            <ProtectedRoute>
              <SellerProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/products/add/:userId"
          element={
            <ProtectedRoute>
              <AddProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/orders/:userId"
          element={
            <ProtectedRoute>
              <SellerOrders />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
