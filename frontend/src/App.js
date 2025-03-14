import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/pages/Navbar';
import Footer from './components/pages/Footer';
import ToastList from './components/ToastList';

import Home from './components/Home';
import Bestsellerproduct from './components/Bestsellerproduct';
import ProductList from './components/ProductList';
import TableList from './components/TableList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Checkout from './components/Checkout';
import Order from './components/Order';

import ManagerSystem from './components/admin/ManagerSystem';
import CreateProduct from './components/CreateProduct';
import CreateTable from "./components/CreateTable";  // Import component
import UpdateProduct from './components/UpdateProduct';
import CreateAccount from './components/CreateAccount';
import UpdateAccount from './components/UpdateAccount';

import './css/App.css';
import './css/Toast.css';

function App() {
    return (
        <Router>
            <div>
                {/* Hiển thị thông báo */}
                <div id="toast">
                    <ToastList />
                </div>

                {/* Navbar */}
                <Navbar />

                {/* Routes */}
                <Routes>
                    {/* Trang chính */}
                    <Route path="/" element={
                        <>
                            <Home />
                            <Bestsellerproduct />
                        </>
                    } />
                    
                    {/* Các trang khác */}
                    <Route path="/menu" element={<ProductList />} />
                    <Route path="/table" element={<TableList />} />
                    <Route path="/product/:slug" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order" element={<Order />} />

                    {/* Quản trị */}
                    <Route path="/manager/admin" element={<ManagerSystem />} />
                    <Route path="/create" element={<CreateProduct />} />
                    <Route path="/createTable" element={<CreateTable />} />
                    <Route path="/update/:id/edit" element={<UpdateProduct />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    <Route path="/update/:id/edit-account" element={<UpdateAccount />} />
                </Routes>

                {/* Footer */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
