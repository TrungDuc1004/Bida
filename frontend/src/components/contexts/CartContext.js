import React, { createContext, useContext } from "react";
import axios from "axios";
import { ToastContext } from "./ToastContext";

const CartContext = createContext();

function CartProvider({ children }) {
    const { showToast } = useContext(ToastContext);

    const handleAddToCart = (productId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            showToast({ title: "Hãy đăng nhập trước!", type: "warning" });
            return;
        }

        axios
            .post(
                `http://localhost:5000/cart/${productId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then(() => {
                showToast({ title: "Sản phẩm đã được thêm!", type: "success" });
            })
            .catch(() => {
                showToast({ title: "Lỗi khi thêm sản phẩm!", type: "warning" });
            });
    };

    return (
        <CartContext.Provider value={{ handleAddToCart }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };
