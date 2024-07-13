import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import './App.css'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Order from './pages/order/Order'
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'
const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <div className='app '>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : null}
      <ToastContainer />
      <Router>
        <Navbar setShowLogin={setShowLogin} />
        <div className="main-content">
          <Routes >
            <Route path='/' element={<Home />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/order' element={<PlaceOrder />}></Route>
            <Route path='/verify' element={<Verify />}></Route>
            <Route path='/myorders' element={<Order />}></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
