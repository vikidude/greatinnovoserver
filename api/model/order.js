const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    customer_name: String,
    customer_mobile_number: Number,
    address: String,
    order_number: Number,
    total_items_count: Number,
    total_cost: Number,
    order_products:  {
        type: mongoose.Schema.Types.ObjectId, ref: 'orderProductDetails'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);