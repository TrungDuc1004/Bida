import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContext } from "./ToastContext";
import api from "../../api/Axios";

const CartContext = createContext();

function CartProvider({ children }) {
    const { showToast } = useContext(ToastContext);
    const [cartCount, setCartCount] = useState(0);

    // Lấy số lượng sản phẩm trong giỏ hàng khi load trang
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            api.get("/cart", { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    setCartCount(res.data.reduce((total, item) => total + item.quantity, 0));

                })
                .catch(() => {
                    showToast({ title: "Không thể tải giỏ hàng!", type: "warning" });
                });
        }
    }, []);


    const handleAddToCart = (productId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            showToast({ title: "Hãy đăng nhập trước!", type: "warning" });
            return;
        }
    
        api.post(`/cart/${productId}`, {}, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                // Lấy giỏ hàng mới sau khi thêm
                api.get("/cart", { headers: { Authorization: `Bearer ${token}` } })
                    .then((cartRes) => {
                        setCartCount(cartRes.data.reduce((total, item) => total + item.quantity, 0));
                    });
                showToast({ title: "Sản phẩm đã được thêm!", type: "success" });
            })
            .catch(() => {
                showToast({ title: "Lỗi khi thêm sản phẩm!", type: "warning" });
            });
    };
    
    const handleRemoveFromCart = (productId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            showToast({ title: "Hãy đăng nhập trước!", type: "warning" });
            return;
        }
    
        api.delete(`/cart/${productId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                // Lấy giỏ hàng mới sau khi xóa
                api.get("/cart", { headers: { Authorization: `Bearer ${token}` } })
                    .then((cartRes) => {
                        setCartCount(cartRes.data.reduce((total, item) => total + item.quantity, 0));
                    });
                showToast({ title: "Sản phẩm đã được xóa!", type: "success" });
            })
            .catch(() => {
                showToast({ title: "Lỗi khi xóa sản phẩm!", type: "warning" });
            });
    };
    
    return (
        <CartContext.Provider value={{ handleAddToCart, handleRemoveFromCart, cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };
