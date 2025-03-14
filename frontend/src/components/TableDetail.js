import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/TableDetail.css";
import api from "../api/Axios";

function TableDetail() {
    const { slug } = useParams();
    const [table, setTable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingTime, setBookingTime] = useState("");
    const [numPlayers, setNumPlayers] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`http://localhost:5000/table/${slug}`)
            .then(response => {
                setTable(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Bàn không tồn tại!");
                setLoading(false);
            });
    }, [slug]);

    const handleBooking = () => {
        if (!bookingTime) {
            alert("Vui lòng chọn thời gian đặt bàn!");
            return;
        }

        const bookingData = {
            tableId: table._id,
            bookingTime,
            numPlayers,
        };

        api.post("http://localhost:5000/bookings", bookingData)
            .then(response => {
                alert("Đặt bàn thành công!");
                navigate("/bookings"); // Chuyển hướng đến danh sách đặt bàn
            })
            .catch(error => {
                alert("Lỗi đặt bàn, vui lòng thử lại!");
                console.error(error);
            });
    };

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="table-detail-container">
            <div className="breadcrumb">
                <Link to="/tables">Danh sách bàn bida</Link> / {table.name}
            </div>

            <div className="table-detail">
                <div className="table-image">
                    <img src={table.image} alt={table.name} />
                </div>

                <div className="table-info">
                    <h2>{table.name}</h2>
                    <p className="table-status">
                        Trạng thái: {table.status === "available" ? 
                        <span className="available">Còn trống</span> : 
                        <span className="booked">Đã đặt</span>}
                    </p>
                    <p className="table-location">Vị trí: {table.location}</p>
                    <p className="table-price">
                        Giá: <span className="old-price">{table.oldPrice}đ</span> → 
                        <span className="new-price">{table.newPrice}đ</span>
                    </p>
                    <p className="table-description">{table.description}</p>

                    <div className="booking-section">
                        <label>Chọn thời gian đặt:</label>
                        <input 
                            type="datetime-local" 
                            value={bookingTime} 
                            onChange={(e) => setBookingTime(e.target.value)} 
                        />

                        <label>Số người chơi:</label>
                        <input 
                            type="number" 
                            min="1" 
                            value={numPlayers} 
                            onChange={(e) => setNumPlayers(e.target.value)} 
                        />

                        <button onClick={handleBooking} className="book-btn">Đặt bàn</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableDetail;
s