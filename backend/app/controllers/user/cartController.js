const Product = require('../../models/Product');
const ProductCart = require('../../models/ProductCart');

// post[/cart/:id] Thêm sản phẩm vào giỏ hàng 
exports.addToCart = (req, res) => {
    const userId = req.user.userId; //*thêm sản phẩm theo user
    const productId = req.params.id; // Lấy productId từ req.params.id

    Product.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng
            return ProductCart.findOne({ userId, productId })
                .then(cartItem => {
                    if (cartItem) {
                        // Nếu đã có, tăng số lượng
                        cartItem.quantity += 1;
                        return cartItem.save();
                    } else {
                        // Nếu chưa có, tạo mới
                        const newCartItem = new ProductCart({
                            userId,
                            productId,
                            name: product.name,
                            image: product.image,
                            newPrice: product.newPrice,
                        });
                        return newCartItem.save();
                    }
                });
        })
        .then(() => res.status(200).json({ message: 'Product added to cart' }))
        .catch(error => {
            console.error('Error adding product to cart:', error);
            res.status(500).json({ message: error.message });
        });
};

// get[/cart] DS giỏ hàng
exports.getCart = (req, res) => {
    const userId = req.user.userId; //*hiển thị theo từng user

    ProductCart.find({ userId })
        .populate('productId')
        .then(products => res.json(products))

        .catch(error => {
            console.error('Error fetching cart:', error);
            res.status(500).json({ message: error.message })
        });
}

// delete[/cart/:id] delete
exports.deleteCart = (req, res) => {
    ProductCart.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Product deleted successfully' }))
        .catch(error => res.status(500).json({ message: error.message }));
}

// put[/cart/:id] cap nhat SL
exports.putQuantityCart = (req, res) => {
    const { action } = req.body;
    const update = action === 'increase'
        ? { $inc: { quantity: 1 } }
        : action === 'decrease'
            ? { $inc: { quantity: -1 } }
            : null;

    if (!update) {
        return res.status(400).json({ message: 'Invalid action' });
    }

    ProductCart.updateOne({ _id: req.params.id }, update)
        .then(() => res.status(200).json({ message: 'Product quantity updated successfully' }))
        .catch(error => res.status(500).json({ message: error.message }));
}

// put[/cart] cap nhat delete
exports.putDeleteCart = (req, res) => {
    ProductCart.deleteMany()
        .then(() => res.status(200).json({ message: 'Products deleted successfully' }))
        .catch(error => res.status(500).json({ message: error.message }));
}
