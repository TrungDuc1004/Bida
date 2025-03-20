import React, { useRef, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import api from '../api/Axios';

function Booking({ table, fetchTables }) {
    const [selectedTime, setSelectedTime] = useState("");
    const [numberOfPlayers, setNumberOfPlayers] = useState(1);
    const [error, setError] = useState(false)
    const dateTimeRef = useRef(null);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username')
    const navigate = useNavigate();

    const handleBooking = async () => {
        if (!token) {
            alert("Bạn chưa đăng nhập!");
            return;
        }

        if (!selectedTime || isNaN(Date.parse(selectedTime))) {
            alert("Vui lòng chọn thời gian hợp lệ!");
            setError(true);
            dateTimeRef.current.focus()
            return;
        }

        try {
            await api.post("/bookings", {
                userId,
                username,
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

            await api.put(`/table/${table._id}/status`, { status: "booked" });

            fetchTables();

            alert("Đặt bàn thành công!");
            navigate("/booked-tables");

        } catch (error) {
            console.error("Lỗi khi đặt bàn:", error);
            alert("Không thể đặt bàn!");
        }
    };


    return (
        <div className="booking-container">
            <label>Chọn thời gian đặt bàn:</label>
            <input
                ref={dateTimeRef}
                type="datetime-local"
                className={error ? "input-error" : ""}
                value={selectedTime}
                onChange={(e) => { 
                    setSelectedTime(e.target.value)
                    setError(false);
                }}
            />
            {error && <p className='error-text'>Vui lòng nhập thời gian </p>}

            <label>Số người chơi:</label>
            <input type="number" min="1" value={numberOfPlayers} onChange={(e) => setNumberOfPlayers(parseInt(e.target.value) || 1)} />

            <button onClick={handleBooking} className="book-btn">
                Đặt bàn
            </button>
        </div>
    );
}

export default Booking;
