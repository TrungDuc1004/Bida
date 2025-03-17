import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/CreateTable.css";
import api from '../api/Axios';

function CreateTable() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const tableData = { name, description, image, oldPrice, newPrice, location, category };

        api.post('/table/create', tableData)
        
            .then(response => {
                alert('Thêm bàn thành công!');
                navigate("/manager/admin");
            })
            .catch(error => {
                alert('Thất bại!');
                console.error(error);
            });
    };

    return (
        <div className='container'>
            <h2>Thêm bàn mới</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Tên bàn" onChange={(e) => setName(e.target.value)} required />
                <select onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Chọn loại bàn</option>
                    <option value="Bi-a Lỗ">Bi-a Lỗ</option>
                    <option value="Bi-a Băng">Bi-a Băng</option>
                </select>
                <textarea placeholder="Mô tả" onChange={(e) => setDescription(e.target.value)}></textarea>
                <input type="text" placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
                <input type="number" placeholder="Giá cũ" onChange={(e) => setOldPrice(e.target.value)} required />
                <input type="number" placeholder="Giá mới" onChange={(e) => setNewPrice(e.target.value)} required />
                <input type="text" placeholder="Vị trí" onChange={(e) => setLocation(e.target.value)} required />
                <button type="submit">Thêm bàn</button>
            </form>
        </div>
    );
}

export default CreateTable;
