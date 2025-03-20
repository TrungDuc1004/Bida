// backend/server.js
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('../backend/app/routes/user/productRoutes');
const tableRoutes = require('../backend/app/routes/user/tableRoutes');
const cartRoutes = require('../backend/app/routes/user/cartRoutes');
const orderRoutes = require('../backend/app/routes/user/orderRoutes');
const bookingRoutes = require('../backend/app/routes/user/bookingRoutes');
const userRoutes = require('../backend/app/routes/user/userRoutes');
const allOrderRoutes = require('../backend/app/routes/admin/allOrderRoutes');
const allBookingRoutes = require('../backend/app/routes/admin/allBookingRoutes');
const allProductRoutes = require('../backend/app/routes/admin/allProductRoutes');
const allTableRoutes = require('../backend/app/routes/admin/allTableRoutes');
const allAccountRoutes = require('../backend/app/routes/admin/allAccountRoutes');
require('dotenv').config();

const app = express();
const PORT = 5000;

//Override
app.use(express.urlencoded({ extended: true }));

// Sử dụng middleware CORS để cho phép React frontend gọi API
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bida', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('MongoDB connection error:', error));

// Định tuyến
app.use('/products', productRoutes);
app.use('/table', tableRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/bookings', bookingRoutes);
app.use('/user', userRoutes);
//admin
app.use('/allorder', allOrderRoutes);
app.use('/allbookings', allBookingRoutes);
app.use('/allproduct', allProductRoutes);
app.use('/alltable', allTableRoutes);
app.use('/allaccount', allAccountRoutes);

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu" });
    }

    res.json({ message: "Đăng nhập thành công", email });
});


app.get("/", (req, res) => {
    res.send("Server đang chạy...");
});

//
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
