const Product = require('../../models/Product');

// get[/allproduct] DS Don hang
exports.listAllProduct = (req, res) => {
    Product.find().lean()
        .then(products => res.json(products))
        .catch(error => res.status(500).json({ message: error.message }));
};

// delete[/allproduct/:id]
exports.deleteOneProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Order Product deleted successfully' }))
        .catch(error => res.status(500).json({ message: error.message }));
}