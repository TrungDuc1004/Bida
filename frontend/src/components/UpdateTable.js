import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/Axios';
import { ToastContext } from "./contexts/ToastContext";
import '../css/CreateProduct.css';

function UpdateTable() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [location, setLocation] = useState('');
    
    const { showToast } = useContext(ToastContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            console.error('Người dùng chưa đăng nhập.');
        } else {
            api.get(`/table/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    const { name, description, image, newPrice, location } = response.data;
                    setName(name);
                    setDescription(description);
                    setImage(image);
                    setNewPrice(newPrice);
                    setLocation(location);
                })
                .catch(error => {
                    console.error('Lỗi khi tải dữ liệu:', error);
                });
        }
    }, [id, token]);

    const handleSubmitUpdate = (e) => {
        e.preventDefault();

        const tableData = { name, description, image, newPrice, location };

        if (!token) {
            showToast({ title: "Bạn cần đăng nhập trước!", type: "warning" });
        } else {
            api.put(`/table/update/${id}`, tableData, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    showToast({ title: "Cập nhật thành công!", type: "success" });
                })
                .catch(error => {
                    console.error('Lỗi khi cập nhật:', error);
                });
        }
    };

    return (
        <div>
            <div className='row'>
                <div className="col col-12 img-extra">Cập nhật thông tin bàn</div>
            </div>
            <div className='container'>
                <h2>Sửa thông tin bàn:</h2>
                <form id='form' onSubmit={handleSubmitUpdate}>
                    <div className='form-input'>
                        <label>Tên bàn:</label>
                        <input value={name} type="text" onChange={(e) => setName(e.target.value)} required />
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
                        <label>Giá thuê:</label>
                        <input value={newPrice} type="text" onChange={(e) => setNewPrice(e.target.value)} required />
                    </div>

                    <div className='form-input'>
                        <label>Vị trí:</label>
                        <input value={location} type="text" onChange={(e) => setLocation(e.target.value)} maxLength="50" />
                    </div>

                    <Link to={`/manager/admin`}>
                        <button className='prd-button'>Quay lại</button>
                    </Link>
                    <Link to={`/manager/admin`}>
                        <button className='prd-button' type="submit">Cập nhật</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default UpdateTable;
