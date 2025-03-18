const Product = require('../../models/Product');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

// Tạo sản phẩm mới
// post[/products/create]
exports.createProduct = (req, res) => {
    const product = new Product(req.body);
    product.save()
        .then(() => res.status(200).json({ success: true }))
        .catch(error => res.status(500).json({ success: false, error: error.message }));
};

// GET [/products/update/:id/edit]
exports.getProduct = (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
            }
            res.status(200).json(product); // Trả về thông tin sản phẩm
        })
        .catch(error => {
            res.status(500).json({ message: 'Lỗi server: ' + error.message });
        });
};

// put[/products/update/:id]
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // Trả về dữ liệu mới, kiểm tra dữ liệu đầu vào
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};


///
// post[/products/createaccount]
exports.createAccount = (req, res) => {
    // const account = new User(req.body);
    // account.save()
    //     .then(() => res.status(200).json({ success: true }))
    //     .catch(error => res.status(500).json({ success: false, error: error.message }));

    const { username, email, password, phonenumber, address, city, country } = req.body;

    // Kiểm tra đầu vào
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    // Băm mật khẩu và lưu vào cơ sở dữ liệu
    bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            const newUser = new User({
                username, email, password: hashedPassword, phonenumber, address, city, country
            });
            return newUser.save();
        })
        .then(() => {
            res.status(201).send('User registered successfully');
        })
        .catch((error) => {
            if (error.code === 11000) {
                // Lỗi trùng email
                res.status(400).json({ error: 'Email is already registered' });
            } else {
                res.status(500).json({ error: 'Error registering user' });
            }
        });
};

//get[/products/update/:id/edit-account]
exports.getAccount = (req, res) => {
    User.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Không tìm thấy tai khoan.' });
            }
            res.status(200).json(product); // Trả về thông tin
        })
        .catch(error => {
            res.status(500).json({ message: 'Lỗi server: ' + error.message });
        });
};

//  put[/products/update/:id/account]
exports.updateAccount = (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.status(200).json({ success: true }))
        .catch(error => res.status(500).json({ success: false, error: error.message }));
};
///




/// Trang chủ (filter va pagination)
// get[/products/menu]
exports.getMenu = (req, res) => {
    const { category, sort, q, page = 1, limit = 8 } = req.query;
    const skip = (page - 1) * limit;

    // Xây dựng bộ lọc
    const filter = category && category !== "Tất cả" ? { category } : {};
    if (q) filter.name = { $regex: q, $options: "i" };// Tìm kiếm không phân biệt chữ hoa/thường
    Promise.all([
        // Lấy danh sách sản phẩm

        Product.find(filter).sort(sort === "asc" ? { newPrice: 1 } : { newPrice: -1 }).skip(skip).limit(parseInt(limit)),
        // Đếm tổng số sản phẩm
        Product.countDocuments(filter),
    ])
        .then(([products, total]) =>
            // Kết quả trả về
            res.json({ data: products, total, totalPages: Math.ceil(total / limit), page: parseInt(page) }))
        .catch(error => res.status(500).json({ message: error.message }));
};

// get[/products/best-seller]
exports.bestSeller = (req, res) => {
    Product.find()
        .then((products) => {
            res.json(products.filter(product => product.isBestSeller));
        })
        .catch((error) => res.status(500).json({ message: error.message }));
};

// get[/products/:slug]
// DS sản phẩm product detail
exports.slug = (req, res) => {
    Product.findOne({ slug: req.params.slug }).lean()
        .then(products =>
            res.json(products))
        .catch(error => res.status(500).json({ message: error.message }));
};
