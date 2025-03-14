const ProductOrder = require('../../models/ProductOrder');

// get[/allorder] DS Don hang
exports.listAllOrder = (req, res) => {
    ProductOrder.find()
        .then(products => res.json(products))
        .catch(error => res.status(500).json({ message: error.message }));
};

// delete[/allorder/:id]
exports.deleteOneOrder = (req, res) => {
    ProductOrder.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Order Product deleted successfully' }))
        .catch(error => res.status(500).json({ message: error.message }));
}