import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductDetail from './components/ProductDetail.jsx'
import NotFound from './components/NotFound.jsx'
import Home from './components/Home.jsx'
import './App.css'
import Cart from './components/Cart.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Checkout from './components/Checkout.jsx'
import About from './components/About.jsx'
import ContactUs from './components/ContactUs.jsx'
import PaymentPage from './components/PaymentPage.jsx'
import CategoryProducts from './components/CategoryProducts.jsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:category" element={<CategoryProducts />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
