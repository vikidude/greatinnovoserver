const Order = require('../model/order');
const OrderProductDetail = require('../model/orderProductDetails');

/**  Import Module*/
const dateTime = require('node-datetime');
const mongoose = require('mongoose');


async function saveOrder(data,product_objectId,last_order_id) {
    var result;
    const dt = dateTime.create();
    const formatted = dt.format('Y-m-d H:M:S');
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        customer_name: data.customer_name,
        customer_mobile_number: data.customer_mobile_number,
        address: data.address,
        order_number: last_order_id,
        total_items_count: data.total_items_count,
        total_cost: data.total_cost,
        order_products: product_objectId
    });
    await order.save().then(doc => {
        result = doc;
    })
    return result;
}

async function getOrdersCount() {
    var count_result = await Order.count();
    return count_result;
}

async function getAllOrder(){
    var result = await Order.find().populate('OrderProductDetail').exec()
    return result;
}

async function getOrderByQuery(off,lim) {
    var result = await Order.find().skip(off).limit(lim).populate('OrderProductDetail').exec()
    return result;
}

async function getOrderWithOrderPartDetails(query) {

    var result;

    await Order.aggregate([{
        $match: query,
    },

    {
        $lookup: {
            from: 'orderproductdetails',
            localField: '_id',
            foreignField: 'orderId',
            as: 'orderProductDetails',          
        }
    },{$unwind:{path:"$orderProductDetails",
    preserveNullAndEmptyArrays: true
        }}, {
        $group: { _id: { _id: "$_id" }, farmInchargeId: { $first: "$farmInchargeId" }, orderProductDetails: { $first: "$orderProductDetails" }, farmsAdminId: { $first: "$farmsAdminId" }, customerId: { $first: "$customerId" } }
    },
    {
        $lookup: {
            from: 'farmincharges',
            localField: 'farmInchargeId',
            foreignField: '_id',
            as: 'farmInchargeId'
        }
    },
    {
        $unwind: {
            path: "$farmInchargeId",
            preserveNullAndEmptyArrays: true
        }
    }, {
        $lookup: {
            from: 'farmsadmins',
            localField: 'farmsAdminId',
            foreignField: '_id',
            as: 'farmsAdminId'
        }
    },
    {
        $unwind: {
            path: "$farmsAdminId",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $lookup: {
            from: 'customers',
            localField: 'customerid',
            foreignField: '_id',
            as: 'customerId'
        }
    },
    {
        $unwind: {
            path: "$customerId",
            preserveNullAndEmptyArrays: true
        }
    }
    ]).exec().then(doc => {
        result = doc;
    });

    return result;
}

async function getLastOrderId(){
    var result = await Order.find().sort({ $natural: -1 }).limit(1).exec()
    return result;
}

module.exports.getLastOrderId = getLastOrderId;
module.exports.getOrderByQuery = getOrderByQuery;
module.exports.saveOrder = saveOrder;
module.exports.getOrderWithOrderPartDetails = getOrderWithOrderPartDetails;
module.exports.getOrdersCount = getOrdersCount;
module.exports.getAllOrder = getAllOrder;