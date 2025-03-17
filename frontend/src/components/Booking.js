import React, { useState } from 'react';
import { useNavigate , useHistt} from 'react-router-dom';
import api from '../api/Axios';

function Booking({ table, fetchTables }) {
    const [selectedTime, setSelectedTime] = useState("");
    const [numberOfPlayers, setNumberOfPlayers] = useState(1);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const handleBooking = async () => {
        if (!token) {
            alert("Bạn chưa đăng nhập!");
            return;
        }

        if (!selectedTime || isNaN(Date.parse(selectedTime))) {
            alert("Vui lòng chọn thời gian hợp lệ!");
            return;
        }

        try {
            await api.post("/bookings", {
                userId,
                tables: [{
                    tableId: table._id,
                    name: table.name,
                    image: table.image,
                    location: table.location,
                    time: selectedTime,
                    numberOfPlayers
                }],
                totalPrice: table.newPrice
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // await api.put(`/table/${table._id}/status`, { status: "booked" });

            alert("Đặt bàn thành công!");

            // Cập nhật lại danh sách bàn trống
            // fetchTables();

            // Điều hướng sang trang bàn đã đặt
            navigate("/booked-tables");

        } catch (error) {
            console.error("Lỗi khi đặt bàn:", error);
            alert("Không thể đặt bàn!");
        }
    };

    return (
        <div className="booking-container">
            <label>Chọn thời gian đặt bàn:</label>
            <input type="datetime-local" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />

            <label>Số người chơi:</label>
            <input type="number" min="1" value={numberOfPlayers} onChange={(e) => setNumberOfPlayers(parseInt(e.target.value) || 1)} />

            <button onClick={handleBooking} className="book-btn">
                Đặt bàn
            </button>
        </div>
    );
}

export default Booking;
