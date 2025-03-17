const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 📌 Đăng ký user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Kiểm tra đầu vào
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Email, username và password là bắt buộc' });
        }

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email đã được đăng ký' });
        }

        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Lưu user mới
        const newUser = new User({ username, email, password: hashedPassword, role: "user", });
        await newUser.save();

        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};

// 📌 Đăng nhập user
exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    // Tìm người dùng theo email
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).send('User not found');
            }
            // So sánh mật khẩu
            bcrypt.compare(password, user.password)
                .then((isPasswordValid) => {
                    if (!isPasswordValid) {
                        return res.status(401).send('Invalid credentials');
                    }
                    // Tạo token
                    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '30 minutes' });
                    res.status(200).json({ token, username: user.username, role: user.role });
                });
        })
        .catch((error) => {
            console.error('Login error:', error); // Log lỗi nếu cần debug
            res.status(400).send('Error logging in');
        });
};

// put[/user/profile]
exports.profileUser = (req, res) => {
    const { phonenumber, address, city, country } = req.body;
    User.findOneAndUpdate({ username: req.body.username }, { phonenumber, address, city, country }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(updatedUser);
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// 📌 Lấy thông tin profile user
exports.getProfileUser = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ error: 'Chưa xác thực' });
        }

        const user = await User.findById(req.user.userId).select('-password'); // Ẩn mật khẩu

        if (!user) {
            return res.status(404).json({ error: 'Không tìm thấy người dùng' });
        }

        res.json(user);
    } catch (error) {
        console.error('Lỗi lấy thông tin user:', error);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};
