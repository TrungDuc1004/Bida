import React, { createContext, useState } from "react";

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [Items, setItems] = useState([]);
    const [ModalOpen, setModalOpen] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    // mở , đóng modal
    const handleOpenModal = (productIdCart) => {
        setProductIdToDelete(productIdCart);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setProductIdToDelete(null);
        setModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{ Items, ModalOpen, productIdToDelete, setItems, setModalOpen, handleOpenModal, handleCloseModal }}>
            {children}
        </ModalContext.Provider>
    );
}

export { ModalContext, ModalProvider };
