import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContext } from "./contexts/ToastContext";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../css/CreateProduct.css' // form giong nen dung lai

function CreateAccount() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    //
    const navigate = useNavigate();
    //
    const { showToast } = useContext(ToastContext)
    //
    const token = localStorage.getItem('token')
    //
    const handleSubmit = (e) => {
        e.preventDefault();

        const accountData = {
            username,
            email,
            password,
            phonenumber,
            address,
            city,
            country
        };
        if (!token) {
            showToast({ title: "Bạn cần đăng nhập trước!", type: "warning" });
        } else {
            axios.post('http://localhost:5000/products/createaccount', accountData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Lấy token từ localStorage
                }
            })
                .then(response => {
                    navigate("/manager/admin");
                    showToast({ title: "Thêm tài khoản thành công!", type: "success" });
                })
                .catch(error => {
                    console.error('Error creating product:', error);  // Log lỗi khi tạo sản phẩm
                    showToast({ title: "Thêm tài khoản thất bại!", type: "warning" });
                });
        }
    };

    return (
        <div>
            <div className='row'>
                <div className="col col-12 img-extra">Tạo tài khoản</div>
            </div>

            <div className='container'>

                <h2>Tạo tài khoản mới</h2>

                <form id='form' onSubmit={handleSubmit}>

                    <div className='form-input'>
                        <label>Tên đăng nhập:</label>
                        <input type="text" onChange={(e) => setUserName(e.target.value)} required />
                    </div>

                    <div className='form-input'>
                        <label>Email:</label>
                        <input placeholder='Nhập đầy đủ ký tự @gmail.com' onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className='form-input'>
                        <label>Mật khẩu:</label>
                        <input type="password" autocomplete="new-password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className='form-input'>
                        <label>Số điện thoại:</label>
                        <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div>

                    <div className='form-input'>
                        <label>Địa chỉ:</label>
                        <input type="text" onChange={(e) => setAddress(e.target.value)} maxLength="150" />
                    </div>

                    <div className='form-input'>
                        <label>Thành phố:</label>
                        <input type="text" onChange={(e) => setCity(e.target.value)} maxLength="20" />
                    </div>

                    <div className='form-input'>
                        <label>Quốc gia:</label>
                        <input type="text" onChange={(e) => setCountry(e.target.value)} maxLength="20" />
                    </div>

                    <Link to={`/manager/admin`}>
                        <button className='prd-button'>Quay lại</button>
                    </Link>

                    <button className='prd-button' type="submit">Tạo tài khoản</button>

                </form>
            </div>
        </div>
    );
}

export default CreateAccount;
