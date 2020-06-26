const mongoose = require('mongoose');

const orderProductDetailsSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    item_name: Array,
    item_price: Array,
    quantity: Array,
}, {
    timestamps: true
});

module.exports = mongoose.model('OrderProductDetail', orderProductDetailsSchema);