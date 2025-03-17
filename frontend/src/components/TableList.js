import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/Axios';
import '../css/TableList.css';
import Booking from './Booking';

function TableList() {
    const [tables, setTables] = useState([]);
    const navigate = useNavigate();

    const fetchTables = async () => {
        try {
            const response = await api.get('/table'); // Kiểm tra đường dẫn API
            console.log('Dữ liệu bàn từ API:', response.data); // Debug dữ liệu
            setTables(response.data.data || []); // Cập nhật state
        } catch (error) {
            console.error('Lỗi khi lấy danh sách bàn:', error);
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    return (
        <div className="table-container">
            <h1 style={{ textAlign: "center" }}>Danh sách bàn bida</h1>

            {/* Danh sách bàn trống */}
            <h2>Bàn còn trống</h2>
            <div className="table-list">
                {tables.length === 0 ? (
                    <p>Hiện không có bàn trống.</p>
                ) : (
                    tables.map((table) => (
                        <div key={table._id} className="table-item">
                            <img src={table.image} alt={table.name} className="table-image" />
                            <h3>{table.name}</h3>
                            <p>{table.description}</p>
                            <p><strong>Giá:</strong> {table.newPrice}đ/1h</p>
                            <p><strong>Vị trí:</strong> {table.location}</p>

                            {/* Component đặt bàn */}
                            <Booking table={table} fetchTables={fetchTables} />
                        </div>
                    ))
                )}
            </div>

            {/* Nút xem bàn đã đặt */}
            <button onClick={() => navigate('/booked-tables')} className="view-booked-btn">
                Xem bàn đã đặt
            </button>
        </div>
    );
}

export default TableList;
