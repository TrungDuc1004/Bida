import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // URL API chính
    timeout: 5000, // Timeout 5 giây
    headers: { 'Content-Type': 'application/json' ,},
});

// Thêm interceptor để tự động đính kèm token vào request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api
