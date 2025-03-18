import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import "../../css/AllBookings.css";
import api from "../../api/Axios";

function AllBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // Gọi API lấy danh sách bàn đã đặt
    useEffect(() => {
        if (!token) {
            console.error("Người dùng chưa đăng nhập.");
            return;
        }

        api.get("/bookings", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi tải danh sách đặt bàn:", error);
                setLoading(false);
            });
    }, []);

    // Xóa đặt bàn
    const handleDelete = (id) => {
        if (!token) {
            console.error("Người dùng chưa đăng nhập.");
            return;
        }

        api.delete(`/bookings/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                setBookings(bookings.filter((booking) => booking._id !== id));
            })
            .catch((error) => {
                console.error("Lỗi khi xóa đặt bàn:", error);
            });
    };

    return (
        <div className="all-bookings">
            <h2>Quản lý đặt bàn</h2>

            {loading ? (
                <p>Đang tải danh sách...</p>
            ) : bookings.length > 0 ? (
                <table className="booking-table">
                    <thead>
                        <tr>
                            <th>Số bàn</th>
                            <th>Người đặt</th>
                            <th>Thời gian đặt</th>
                            <th>Số người chơi</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking.tableNumber}</td>
                                <td>{booking.customerName}</td>
                                <td>{new Date(booking.bookingTime).toLocaleString()}</td>
                                <td>{booking.numberOfPlayers}</td>
                                <td>{booking.status}</td>
                                <td>
                                    <button className="edit-btn">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDelete(booking._id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Không có bàn nào được đặt.</p>
            )}
        </div>
    );
}

export default AllBookings;
