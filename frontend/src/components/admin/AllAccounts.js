import React from "react";
import axios from 'axios';
import DeleteModal from "../DeleteModal";
import { ModalContext } from "../contexts/ModalContext";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../../css/AllAccount.css';
import '../../css/DeleteModal.css'

function AllAccounts() {
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
            axios.get('http://localhost:5000/allaccount', {
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
                axios.delete(`http://localhost:5000/allaccount/${productIdToDelete}`, {
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
            <div className="allaccount-list">
                {Items.length > 0 ? (
                    <div className="allaccount">
                        <div className="col col-2 allaccount-link">
                            <Link to={`/create-account`}>
                                <button>
                                    Thêm tài khoản
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : ('')}

                {Items.length > 0 ? (
                    <div className="row allaccount-title">
                        <div className="col col-2">Tên đăng nhập</div>
                        <div className="col col-2">Thông tin</div>
                        <div className="col col-2">Số điện thoại</div>
                        <div className="col col-2">Địa chỉ</div>
                        <div className="col col-2">Loại bỏ</div>
                        <div className="col col-2">Chi tiết</div>
                    </div>
                ) : ('')}

                <div className="">
                    {Items.length > 0 ? (
                        Items.map(item => (
                            <div className="row allaccount-item" key={item._id}>
                                <div className="col col-2">
                                    <h4>{item.username}</h4>
                                </div>

                                <div className="col col-2 allaccount-item_info">
                                    <p className="webkit-email">Email:{item.email}</p>
                                    <p className="webkit-password">Mật khẩu: {item.password}</p>
                                    <p className="newPrice-red text-gray">Vai trò: {item.role}</p>
                                </div>

                                <div className="col col-2">
                                    <p>{item.phonenumber}</p>
                                </div>

                                <div className="col col-2">
                                    <p className="webkit-address">{item.address}</p>
                                </div>

                                <div className="col col-2 allaccount-item_quantity">
                                    <div onClick={() => handleOpenModal(item._id)}>
                                        <FontAwesomeIcon className="trashcan" icon={faTrashCan} />
                                    </div>
                                </div>

                                <div className="col col-2">
                                    <Link className="allaccount-link_update" to={`/update/${item._id}/edit-account`}>Sửa thông tin</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="allaccount-order-empty">
                            <div className="allaccount-order-empty_back">
                                <p>Tài khoản trống.
                                    <Link className='remove-text-decoration color-text-home' to={`/register`}> Đăng ký tài khoản ngay!</Link>
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

export default AllAccounts;
