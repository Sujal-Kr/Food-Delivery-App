import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Order'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Router>
      <ToastContainer/>
        <Navbar />
        <hr />
        <div className="app-content flex">
            <Sidebar />
            <Routes>
              <Route path='/add' element={<Add/>}></Route>
              <Route path='/list' element={<List/>}></Route>
              <Route path='/order' element={<Order/>}></Route>

            </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
