import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "../../css/AllBookings.css";
import api from "../../api/Axios";

function AllBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            console.error("Người dùng chưa đăng nhập.");
            return;
        }

        api.get("/allbookings", {
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

    const handleDelete = (id) => {
        if (!token) {
            console.error("Người dùng chưa đăng nhập.");
            return;
        }

        api.delete(`/allbookings/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                setBookings(bookings.filter((bookings) => bookings._id !== id));
            })
            .catch((error) => {
                console.error("Lỗi khi xóa đặt bàn:", error);
            });
    };

    const handleUpdateStatus = (id, newStatus) => {
        api.put(`/allbookings/${id}/status`, { status: newStatus }, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                setBookings(bookings.map(bookings =>
                    bookings._id === id ? { ...bookings, status: newStatus } : bookings
                ));
            })
            .catch((error) => {
                console.error("Lỗi khi cập nhật trạng thái:", error);
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
                            <th>Tên bàn</th>
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
                                <td>{booking.tables[0]?.name || "Không rõ"}</td>
                                <td>{booking.userName}</td>
                                <td>{new Date(booking.createdAt).toLocaleString()}</td>
                                <td>{booking.tables.length}</td>
                                <td>
                                    <td className={`status-${booking.status}`}>
                                        {booking.status === "confirmed" ? "✅ Đã đặt" :
                                            booking.status === "canceled" ? "❌ Đã hủy" :
                                                "⏳ Chờ xác nhận"}
                                    </td>

                                </td>
                                <td>
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
