import React from "react";
import axios from 'axios';
import DeleteModal from "../DeleteModal";
import { ModalContext } from "../contexts/ModalContext";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../../css/AllProduct.css';
import '../../css/DeleteModal.css'
import api from "../../api/Axios";

function AllProducts() {
    const { Items, ModalOpen, productIdToDelete, setItems, setModalOpen, handleOpenModal, handleCloseModal } = useContext(ModalContext);
    //
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    /// Lấy giỏ hàng từ server khi load trang
    useEffect(() => {
        console.log('Token:', token);
        if (!token) {
            console.error('Người dùng chưa đăng nhập.');
        } else {
            api.get('/allproduct', {
                headers: {
                    Authorization: `Bearer ${token}` // Gửi token trong header
                }
            })
                .then(response => {
                    setItems(response.data) // Giỏ hàng từ API
                })
                .catch(error => {
                    console.error('Lỗi khi tải:', error);
                });
        }
    }, []);

    // Xử lý logic xóa sản phẩm
    const handleDelete = () => {
        if (productIdToDelete) {
            if (!token) {
                console.error('Người dùng chưa đăng nhập.');
            } else {
                api.delete(`/allproduct/${productIdToDelete}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Gửi token trong header
                    }
                })
                    .then(response => {
                        setItems(prevItems => prevItems.filter(item => item._id !== productIdToDelete));
                    })
                    .catch((error) => {
                        console.error('Error deleting product from cart:', error);
                    });
            }
        }
        setModalOpen(false);
    };

    return (
        <div>
            <div className="allproduct-list">
                {Items.length > 0 ? (
                    <div className="allproduct">
                        <div className="col col-2 allproduct-link">
                            <Link to={`/create`}>
                                <button>
                                    Thêm sản phẩm
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : ('')}

                {Items.length > 0 ? (
                    <div className="row allproduct-title">
                        <div className="col col-1">Ảnh</div>
                        <div className="col col-5">Thông tin tất cả sản phẩm</div>
                        <div className="col col-3">Loại bỏ</div>
                        <div className="col col-3">Chi tiết</div>
                    </div>
                ) : ('')}

                <div className="">
                    {Items.length > 0 ? (
                        Items.map(item => (
                            <div className="row allproduct-item" key={item._id}>
                                <div className="col col-1 allproduct-item_img">
                                    <Link to={`/product/${item.slug}`}>
                                        <img src={item.image} alt='' />
                                    </Link>
                                </div>

                                <div className="col col-5 allproduct-item_info">
                                    <div>
                                        <Link className="remove-text-decoration" to={`/product/${item.slug}`}>
                                            <h5>{item.name}</h5>
                                        </Link>
                                    </div>
                                    <p className="newPrice-red"><span className="font-size_small"></span>{item.newPrice}đ</p>
                                    <p className="text-gray">Kho: 343</p>
                                </div>

                                <div className="col col-3 allproduct-item_quantity">
                                    <div onClick={() => handleOpenModal(item._id)}>
                                        <FontAwesomeIcon className="trashcan" icon={faTrashCan} />
                                    </div>
                                </div>

                                <div className="col col-3">
                                    <Link className="allproduct-link_update" to={`/update/${item._id}/edit`}>Sửa thông tin</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="allproduct-order-empty">
                            <div className="allproduct-order-empty_back">
                                <p>Sản phẩm trống.
                                    <Link className='remove-text-decoration color-text-home' to={`/menu`}> Thêm sản phẩm ngay!</Link>
                                </p>
                            </div>

                            <div>
                                <img src="../img/cart-empty.png"></img>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <DeleteModal
                        ModalOpen={ModalOpen}
                        handleCloseModal={handleCloseModal}
                        handleDelete={handleDelete}
                    />
                </div>

            </div>
        </div>

    )
}

export default AllProducts;
