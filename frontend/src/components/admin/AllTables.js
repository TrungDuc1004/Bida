import React from "react";
import DeleteModal from "../DeleteModal";
import { ModalContext } from "../contexts/ModalContext";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../../css/AllTable.css';
import '../../css/DeleteModal.css'
import api from "../../api/Axios";

function AllTables() {
    const { Items, ModalOpen, tablesIdToDelete, setItems, setModalOpen, handleOpenModal, handleCloseModal } = useContext(ModalContext);
    //
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    /// Lấy giỏ hàng từ server khi load trang
    useEffect(() => {
        console.log('Token:', token);
        if (!token) {
            console.error('Người dùng chưa đăng nhập.');
        } else {
            api.get('/allTable', {
            })
                .then(response => {
                    setItems(response.data) // Giỏ hàng từ API
                })
                .catch(error => {
                });
        }
    }, []);

    // Xử lý logic xóa sản phẩm
    const handleDelete = () => {
        if (tablesIdToDelete) {
            if (!token) {
                console.error('Người dùng chưa đăng nhập.');
            } else {
                api.delete(`/alltable/${tablesIdToDelete}`, {
                })
                    .then(response => {
                        setItems(prevItems => prevItems.filter(item => item._id !== tablesIdToDelete));
                    })
                    .catch((error) => {
                        console.error('Error deleting table from cart:', error);
                    });
            }
        }
        setModalOpen(false);
    };

    return (
        <div>
            <div className="alltables-list">
                {Items.length > 0 ? (
                    <div className="alltables">
                        <div className="col col-2 alltables-link">
                            <Link to={`/createTable `}>
                                <button>
                                    Thêm bàn Bida
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : ('')}

                {Items.length > 0 ? (
                    <div className="row allproduct-title">
                        <div className="col col-1">Ảnh</div>
                        <div className="col col-5">Thông tin tất cả bàn</div>
                        <div className="col col-3">Loại bỏ</div>
                        <div className="col col-3">Chi tiết</div>
                    </div>
                ) : ('')}

                <div className="">
                    {Items.length > 0 ? (
                        Items.map(item => (
                            <div className="row alltable-item" key={item._id}>
                                <div className="col col-1 allproduct-item_img">
                                    <Link to={`/table/${item.slug}`}>
                                        <img src={item.image} alt='' />
                                    </Link>
                                </div>

                                <div className="col col-5 alltable-item_info">
                                    <div>
                                        <Link className="remove-text-decoration" to={`/table/${item.slug}`}>
                                            <h5>{item.name}</h5>
                                        </Link>
                                    </div>
                                    <p className="newPrice-red"><span className="font-size_small"></span>{item.newPrice}đ/1h</p>
                                </div>

                                <div className="col col-3 alltable-item_quantity">
                                    <div onClick={() => handleOpenModal(item._id)}>
                                        <FontAwesomeIcon className="trashcan" icon={faTrashCan} />
                                    </div>
                                </div>

                                <div className="col col-3">
                                    <Link className="alltable-link_update" to={`/edit/${item._id}/update`}>Sửa thông tin</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="alltable-order-empty">
                            <div className="alltable-order-empty_back">
                                <p>Sản phẩm trống.
                                    <Link className='remove-text-decoration color-text-home' to={`/table`}> Thêm sản phẩm ngay!</Link>
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

export default AllTables;
