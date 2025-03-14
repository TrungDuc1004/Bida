import { useContext } from "react";
import { ToastContext } from "./contexts/ToastContext";
import Toast from "./Toast";

const ToastList = () => {
    const { toasts, removeToast } = useContext(ToastContext);

    return (
        <>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    title={toast.title}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </>
    );
};

export default ToastList;