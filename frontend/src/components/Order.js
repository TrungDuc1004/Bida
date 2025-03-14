import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/Order.css';

function Order() {
    const [orderItems, setOrderItems] = useState([]);
    /// Lấy giỏ hàng từ server khi load trang
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Người dùng chưa đăng nhập.');
        } else {
            axios.get('http://localhost:5000/order', {
                headers: {
                    Authorization: `Bearer ${token}` // Gửi token trong header
                }
            })
                .then(response => {
                    setOrderItems(response.data); // Giỏ hàng từ API
                })
                .catch(error => {
                    console.error('Lỗi khi tải giỏ hàng:', error);
                });
        }
    }, []);

    return (
        <div>
            <div className="row">
                <div className="col col-12 img-extra">Đơn hàng</div>
            </div>

            <div className="order-list">
                {orderItems.length > 0 ? (
                    <div className="row order-title">
                        <div className="col col-1">Ảnh</div>
                        <div className="col col-6">Tên đơn hàng</div>
                        <div className="col col-1">Giá</div>
                        <div className="col col-4">Thời gian đặt</div>
                    </div>
                ) : ('')}

                <div>
                    {orderItems.length > 0 ? (
                        orderItems.map(item => (
                            <div className="row order-item" key={item._id}>
                                <div className="col col-1 order-item_img">
                                    <img src={item.products[0].image} alt='' />
                                </div>

                                <div className="col col-6 order-item_info" >
                                    <div>
                                        <h5>
                                            {item.products.map(product => (<p>{product.name}</p>))}
                                        </h5>
                                    </div>
                                </div>

                                <div className="col col-1 order-item_newprice">
                                    <p className="newPrice-red"><span className="font-size_small">đ</span>{item.totalShipping}</p>
                                </div>

                                <div className="col col-4 order-item_createdAt">
                                    <p>{item.createdAt}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="cart-order-empty">
                            <div className="cart-order-empty_back">
                                <p >Đơn hàng trống.
                                    <Link className='remove-text-decoration color-text-home' to={`/menu`}> Thêm vào giỏ ngay!</Link>
                                </p>
                            </div>

                            <div>
                                <img src="img/cart-empty.png"></img>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Order;

