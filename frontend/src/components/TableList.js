import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import api from '../api/Axios';

function TableList() {
    const [tables, setTables] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [numberOfPlayers, setNumberOfPlayers] = useState(1);

    useEffect(() => {
        api.get('/table')
            .then(response => {
                console.log("Du lieu tu API:", response.data)
                setTables(response.data.data || []);
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách bàn:', error);
            });
    }, []);
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId'); 
    const handleBooking = async (table) => {
       

        if (!token ) {
            console.log("khong tim thay user hoac userId", {token, userId})
            alert("Bạn chưa đăng nhập!");
            return;
        }

        if (!selectedTime || numberOfPlayers < 1) {
            alert("Vui lòng chọn thời gian và số người chơi!");
            return;
        }
        if (!selectedTime || isNaN(Date.parse(selectedTime))) {
            alert("Vui lòng chọn thời gian hợp lệ!");
            return;
        }
        
        try {
            const response = await api.post("/bookings",
                {
                    userId,
                    tables: [{
                        tableId: table._id,
                        name: table.name,
                        image: table.image,
                        location: table.location,
                        time: selectedTime, // Chỉ lưu thời gian đặt bàn
                        numberOfPlayers: numberOfPlayers
                    }],
                    totalPrice: table.newPrice * numberOfPlayers
                },
            );

            console.log("Phản hồi từ server:", response.data);
            alert("Đặt bàn thành công!");
        } catch (error) {
            if (error.response) {
                console.error("Lỗi API:", error.response.data);
                if (error.response.status === 401) {
                    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
                } else {
                    alert("Không thể đặt bàn: " + error.response.data.message);
                }
            } else {
                console.error("Lỗi không xác định:", error.message);
                alert("Lỗi kết nối đến server!");
            
            }     
    }}

    return (
        <div className="table-container">
            <h1>Danh sách bàn bida</h1>
            <label>Chọn thời gian đặt bàn:</label>
            <input 
                type="datetime-local" 
                value={selectedTime} 
                onChange={(e) => setSelectedTime(e.target.value)} 
            />

            <label>Số người chơi:</label>
            <input 
                type="number" 
                min="1" 
                value={numberOfPlayers} 
                onChange={(e) => setNumberOfPlayers(parseInt(e.target.value) || 1)}
                />

            <div className="table-list">
                {Array.isArray(tables) && tables.length > 0 ? (
                    tables.map((table) => (
                        <div key={table._id} className="table-item">
                            <img src={table.image} alt={table.name} className="table-image" />
                            <h3>{table.name}</h3>
                            <p>{table.description}</p>
                            <p><strong>Giá:</strong> {table.newPrice}đ</p>

                            {table.bookedBy ? (
                                <p><strong>Đã đặt bởi:</strong> {table.bookedBy.name} lúc {new Date(table.bookedTime).toLocaleString()}</p>
                            ) : (
                                <button onClick={() => handleBooking(table)} className="book-btn">
                                    Đặt bàn
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Không có bàn nào!</p>
                )}
            </div>
        </div>
    );
}

export default TableList;
