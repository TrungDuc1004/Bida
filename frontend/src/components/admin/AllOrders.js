import React, { useContext } from "react";
import { useEffect } from "react";
import { ModalContext } from "../contexts/ModalContext";
import DeleteModal from "../DeleteModal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '../../css/AllOrder.css';
import api from "../../api/Axios";

function AllOrders() {
    const { Items, ModalOpen, productIdToDelete, setItems, setModalOpen, handleOpenModal, handleCloseModal } = useContext(ModalContext);

    const token = localStorage.getItem('token');

    /// Lấy giỏ hàng từ server khi load trang
    useEffect(() => {
        if (!token) {
            console.error('Người dùng chưa đăng nhập.');
        } else {
            api.get('/allorder', {
                headers: {
                    Authorization: `Bearer ${token}` // Gửi token trong header
                }
            })
                .then(response => {
                    setItems(response.data); // Giỏ hàng từ API
                })
                .catch(error => {
                    console.error('Lỗi khi tải giỏ hàng:', error);
                });
        }
    }, []);

    // Xử lý logic xóa sản phẩm
    const handleDelete = () => {
        if (productIdToDelete) {
            if (!token) {
                console.error('Người dùng chưa đăng nhập.');
            } else {
                api.delete(`/allorder/${productIdToDelete}`, {
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
            <div className="allorder-list">
                <Link to="/manager/admin">
                    <button className="back-to-admin">Quay lại</button>
                </Link>
                {Items.length > 0 ? (
                    <div className="row allorder-title">
                        <div className="col col-1">Ảnh</div>
                        <div className="col col-4">Tên đơn hàng</div>
                        <div className="col col-1">Tổng</div>
                        <div className="col col-4">Thời gian đặt</div>
                    </div>
                ) : ('')}

                <div>
                    {Items.length > 0 ? (
                        Items.map(item => (
                            <div className="row allorder-item" key={item._id}>
                                <div className="col col-1 allorder-item_img">
                                    {item.products?.[0]?.image ? (
                                        <img src={item.products[0].image} alt='' />
                                    ) : (
                                        <p>Không có hình ảnh</p>
                                    )}

                                </div>

                                <div className="col col-4 allorder-item_info" >
                                    <div>
                                        <h5>
                                            {item.products?.length > 0 ? (
                                                item.products.map(product => (<p key={product._id}>{product.name}</p>))
                                            ) : (
                                                <p>Không có sản phẩm</p>
                                            )}

                                        </h5>
                                    </div>
                                </div>

                                <div className="col col-1 allorder-item_newprice">
                                    <p className="newPrice-red"><span className="font-size_small">đ</span>{item.totalShipping}</p>
                                </div>

                                <div className="col col-4 allorder-item_createdAt">
                                    <p>{item.createdAt}</p>
                                </div>

                                <div onClick={() => handleOpenModal(item._id)}>
                                    <FontAwesomeIcon className="trashcan" icon={faTrashCan} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="all-order-empty">
                            <div className="cart-order-empty_back">
                                <p >Đơn hàng trống.
                                    <Link className='remove-text-decoration color-text-home' to={`/menu`}> Thêm vào giỏ ngay!</Link>
                                </p>
                            </div>

                            <div>
                                <img src="/img/cart-empty.png"></img>
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
export default AllOrders;

