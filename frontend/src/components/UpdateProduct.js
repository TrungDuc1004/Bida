import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContext } from "./contexts/ToastContext";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../css/CreateProduct.css' // form giong nhau nen dung lai

function UpdateProduct() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');

    const { showToast } = useContext(ToastContext)

    const token = localStorage.getItem('token');

    /// Lấy san pham theo id từ server khi load trang
    useEffect(() => {
        if (!token) {
            console.error('Người dùng chưa đăng nhập.');
        } else {
            axios.get(`http://localhost:5000/products/update/${id}/edit`, {
                headers: {
                    Authorization: `Bearer ${token}` // Gửi token trong header
                }
            })
                .then(response => {
                    const { name, description, image, oldPrice, newPrice, location, category } = response.data
                    setName(name);
                    setDescription(description);
                    setImage(image);
                    setOldPrice(oldPrice);
                    setNewPrice(newPrice);
                    setLocation(location);
                    setCategory(category);
                })
                .catch(error => {
                    console.error('Lỗi khi tải:', error);
                });
        }
    }, []);

    const handleSubmitUpdate = (e) => {
        e.preventDefault();

        const productData = {
            name,
            description,
            image,
            oldPrice,
            newPrice,
            location,
            category
        };

        if (!localStorage.getItem('token')) {
            showToast({ title: "Bạn cần đăng nhập trước!", type: "warning" });
        } else {
            axios.put(`http://localhost:5000/products/update/${id}`, productData, {
                headers: {
                    Authorization: `Bearer ${token}` // Gửi token trong header
                }
            })
                .then(response => {
                    showToast({ title: "Cập nhật thành công!", type: "success" });
                })
                .catch(error => {
                    console.error('Error creating product:', error);  // Log lỗi khi tạo sản phẩm
                });
        }
    };

    return (
        <div>
            <div className='row'>
                <div className="col col-12 img-extra">Cập nhật thông tin sản phẩm</div>
            </div>

            <div className='container'>

                <h2>Sửa thông tin :</h2>

                <form id='form' onSubmit={handleSubmitUpdate}>

                    <div className='form-input'>
                        <label>Tên:</label>
                        <input value={name} type="text" onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className='form-input'>
                        <label>Loại danh mục:</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option>Chọn</option>
                            <option>Đồ ăn</option>
                            <option>Đồ uống</option>
                        </select>
                    </div>

                    <div className='form-description-textarea'>
                        <label>Mô tả:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength="600" />
                    </div>

                    <div className='form-input'>
                        <label>Image URL:</label>
                        <input value={image} type="text" onChange={(e) => setImage(e.target.value)} maxLength="255" />
                    </div>

                    <div className='form-input'>
                        <label>Giá cũ:</label>
                        <input value={oldPrice} type="text" onChange={(e) => setOldPrice(e.target.value)} required />
                    </div>

                    <div className='form-input'>
                        <label>Giá mới:</label>
                        <input value={newPrice} type="text" onChange={(e) => setNewPrice(e.target.value)} required />
                    </div>

                    <div className='form-input'>
                        <label>Vị trí:</label>
                        <input value={location} type="text" onChange={(e) => setLocation(e.target.value)} maxLength="20" />
                    </div>

                    <Link to={`/manager/admin`}>
                        <button className='prd-button'>Quay lại</button>
                    </Link>

                    <button className='prd-button' type="submit">Cập nhật</button>

                </form>
            </div>
        </div>
    );
}

export default UpdateProduct;
