const OrderProductDetails = require('../model/orderProductDetails');

/**  Import Module*/
const dateTime = require('node-datetime');
const mongoose = require('mongoose');
//const logger=require('../lib/logger');

async function saveOrderProductDetails(data){
    var result;
    var orderProductDetails = new OrderProductDetails({
        _id: new mongoose.Types.ObjectId(),
        item_name: data.item_name,
        item_price: data.item_price,
        quantity: data.quantity
    });
    await  orderProductDetails.save().then(doc=>{
        // console.log('order product stored: ',doc);
        result = doc;
    });
    return result;
}


async function getOrderProductDetailsByQuery(query, res) {
    var result = await OrderProductDetails.find(query).exec()
    // console.log('Order product get: ',await result);
    return result;
}

async function updateOrderProductsStatus(data, modifiedBy) {
    const dt = dateTime.create();
    const formatted = dt.format('Y-m-d H:M:S');
    var result = await OrderProductDetails.findByIdAndUpdate({ _id: data._id }, {
        $set: {
            status: data.status,
            modifiedBy: modifiedBy,
            modifiedOn: formatted
        }
    }).exec();

    result
}

async function getOneOrderProductDetails(query){
    var result = await (await OrderProductDetails.findOne(query)).exec();

    return result;

}

module.exports.getOrderProductDetailsByQuery=getOrderProductDetailsByQuery;
module.exports.updateOrderProductsStatus=updateOrderProductsStatus;
module.exports.getOneOrderProductDetails=getOneOrderProductDetails;
module.exports.saveOrderProductDetails =saveOrderProductDetails;