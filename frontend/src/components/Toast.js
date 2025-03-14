import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faXmark } from "@fortawesome/free-solid-svg-icons";

const Toast = ({ title, type, duration, onClose }) => {
    const icons = {
        success: <FontAwesomeIcon icon={faCircleCheck} />,
        warning: <FontAwesomeIcon icon={faCircleXmark} />
    };

    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`toast toast--${type}`} style={{ animation: `slideInLeft 0.3s, fadeOut 1s ${duration / 1000}s forwards` }}>
            <div className="toast__icon">{icons[type]}</div>
            <div className="toast__body">
                <h3 className="toast__title">{title}</h3>
            </div>
            <div className="toast__close" onClick={onClose}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    );
};

export default Toast;
