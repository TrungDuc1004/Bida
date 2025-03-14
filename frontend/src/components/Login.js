import React from "react";
import { useState, useContext } from "react";
import { ToastContext } from "./contexts/ToastContext";
import { AuthContext } from "./contexts/AuthContext";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'
import api from "../api/Axios";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    //
    const navigate = useNavigate();
    //
    const { showToast } = useContext(ToastContext)

    const { login } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();

        api.post('/user/login', { email, password })
            .then((response) => {
                console.log("Dữ liệu trả về từ API login:", response.data);
                const { token, username, role } = response.data;
                login(token, username, role);
                showToast({ title: "Đăng nhập thành công!", type: "success" });
                navigate("/");
            })
            .catch((error) => {
                setMessage('Đăng nhập thất bại');
            });
    };

    return (
        <div className="img-login-register">
            <div className="login">
                <p className="login-title">Đăng nhập</p>
                <form className="login-form" onSubmit={handleLogin}  >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email" />
                        

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        placeholder="Mật khẩu" />

                    <button type="submit">Đăng nhập</button>

                    <p className="login-question">Bạn chưa Đăng ký?
                        <Link className="link-to_register" to={`/register`}> Đăng ký ngay</Link>
                    </p>
                </form>
                <span>
                    <p>{message}</p>
                </span>
            </div>
        </div>
    )
}

export default Login;