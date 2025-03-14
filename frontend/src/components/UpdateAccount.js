import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContext } from "./contexts/ToastContext";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../css/CreateProduct.css' // form giong nhau nen dung lai

function UpdateAccount() {
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const { showToast } = useContext(ToastContext)

    const token = localStorage.getItem('token');

    /// Lấy san pham theo id từ server khi load trang
    useEffect(() => {
        if (!token) {
            console.error('Người dùng chưa đăng nhập.');
        } else {
            axios.get(`http://localhost:5000/products/update/${id}/edit-account`, {
                headers: {
                    Authorization: `Bearer ${token}` // Gửi token trong header
                }
            })
                .then(response => {
                    const { username, email, password, role, phonenumber, address, city, country } = response.data
                    setUsername(username);
                    setEmail(email);
                    setPassword(password);
                    setRole(role);
                    setPhoneNumber(phonenumber);
                    setAddress(address);
                    setCity(city);
                    setCountry(country);
                })
                .catch(error => {
                    console.error('Lỗi khi tải:', error);
                });
        }
    }, []);

    const handleSubmitUpdate = (e) => {
        e.preventDefault();

        const accountData = {
            username,
            email,
            password,
            role,
            phonenumber,
            address,
            city,
            country
        };

        if (!localStorage.getItem('token')) {
            showToast({ title: "Bạn cần đăng nhập trước!", type: "warning" });
        } else {
            axios.put(`http://localhost:5000/products/update/${id}/account`, accountData, {
                headers: {
                    Authorization: `Bearer ${token}` // Gửi token trong header
                }
            })
                .then(response => {
                    showToast({ title: "Cập nhật thành công!", type: "success" });
                })
                .catch(error => {
                    console.error('Error creating product:', error);  // Log lỗi khi tạo sản phẩm
                    showToast({ title: "Cập nhật thất bại!", type: "success" });
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
                        <label>Tên đăng nhập:</label>
                        <input value={username} type="text" onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div className='form-input'>
                        <label>Email:</label>
                        <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className='form-input'>
                        <label>Mật khẩu:</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} maxLength="600" />
                    </div>

                    <div className='form-input'>
                        <label>Vai trò:</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option>user</option>
                            <option>admin</option>
                        </select>
                    </div>

                    <div className='form-input'>
                        <label>Số điện thoại:</label>
                        <input value={phonenumber} type="text" onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div>

                    <div className='form-input'>
                        <label>Địa chỉ:</label>
                        <input value={address} type="text" onChange={(e) => setAddress(e.target.value)} required />
                    </div>

                    <div className='form-input'>
                        <label>Thành phố:</label>
                        <input value={city} type="text" onChange={(e) => setCity(e.target.value)} maxLength="20" />
                    </div>

                    <div className='form-input'>
                        <label>Quốc gia:</label>
                        <input value={country} type="text" onChange={(e) => setCountry(e.target.value)} maxLength="20" />
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

export default UpdateAccount;
