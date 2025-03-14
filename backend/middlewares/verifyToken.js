const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "Không có token, vui lòng đăng nhập lại" });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trim();
    }

    console.log("token", token);
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
        req.user = verified;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token đã hết hạn, vui lòng đăng nhập lại" });
        }
        return res.status(400).json({ message: "Token không hợp lệ" });
    }
};

module.exports = verifyToken;
