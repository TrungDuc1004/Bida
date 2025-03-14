import React, { useContext } from "react";
import { ProfileContext } from './contexts/ProfileContext';
import { ToastContext } from "./contexts/ToastContext";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/Checkout.css'

function Checkout() {
    const { username, phonenumber, address, city, country } = useContext(ProfileContext)
    const { showToast } = useContext(ToastContext)
    //
    const navigate = useNavigate();
    //
    const [checkoutData, setCheckoutData] = useState({ Items: [] }); // cartItems

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Người dùng chưa đăng nhập.');
        } else {
            const data = JSON.parse(localStorage.getItem("checkoutData"));
            if (data) {
                setCheckoutData(data);
            }
        }
    }, []);

    const handleOrder = () => {
        const products = checkoutData.Items.map(item => ({
            productId: item._id,
            name: item.name,
            image: item.image,
            newPrice: item.newPrice,
            quantity: item.quantity,
        }));

        const orderData = {
            products,
            total: checkoutData.total,
            shippingFee: checkoutData.shippingFee,
            totalShipping: checkoutData.totalShipping,
        };

        if (products.length > 0) {
            axios.post('http://localhost:5000/order', orderData,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                })
                .then(response => {
                    showToast({ title: "Đặt hàng thành công!", type: "success" });
                    //update products trong cart
                    axios.put('http://localhost:5000/cart')
                        .then(response => { })
                        .catch(error => {
                            console.error('Error creating product:', error);
                        })
                    //
                    localStorage.removeItem('checkoutData');
                    navigate('/order');
                })
                .catch(error => {
                    console.error('Error order product:', error.response?.data || error.message);
                    alert('Có lỗi xảy ra khi đặt hàng!');
                });
        } else {
            alert('Giỏ hàng rỗng, không thể đặt hàng!');
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col col-12 img-extra">Thanh toán</div>
            </div>

            <div className="row info-checkout-container">
                <div className="col col-6 info-buyer">
                    <h3>Thông tin người mua:</h3>
                    <p>- Tên người dùng: <span>{username}</span></p>
                    <p>- Số điện thoại: <span>{phonenumber}</span></p>
                    <p>- Địa chỉ: <span>{address}</span></p>
                    <p>- Thành phố: <span>{city}</span></p>
                    <p>- Nước: <span>{country}</span></p>
                </div>

                <div className="col col-6 infor-checkout">
                    <h3 className="infor-checkout-title">Thông tin thanh toán</h3>
                    <div className="infor-checkout-box">
                        {checkoutData.Items.map((item) => (
                            <div key={item._id}>
                                <p>
                                    <span className="infor-checkout-name">{item.name}</span>
                                    - (Số lượng: {item.quantity} - Giá: {item.newPrice}đ)
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="infor-checkout-Pee">
                        <p>Số lượng : {checkoutData.quantity}</p>
                        <p>Giá tổng sản phẩm : {checkoutData.total}đ</p>
                        <h4>Phí vận chuyển : {checkoutData.shippingFee}đ</h4>
                        <h3>Tổng : {checkoutData.totalShipping}đ</h3>
                    </div>
                    <button onClick={() => handleOrder()} className="infor-checkout-button">Đặt hàng</button>
                </div>
            </div>
        </div>
    )
}
export default Checkout;