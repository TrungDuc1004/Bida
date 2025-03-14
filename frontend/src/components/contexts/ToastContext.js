import React, { createContext, useState } from "react";

const ToastContext = createContext();

function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = ({ title, type = "success", duration = 2500 }) => {
        const id = Date.now();
        setToasts((prevToasts) => [...prevToasts, { id, title, type, duration }]);
    };

    const removeToast = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast, toasts, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export { ToastContext, ToastProvider }
