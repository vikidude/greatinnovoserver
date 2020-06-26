const orderService = require("../service/orderService");
const orderProductDeatailService = require("../service/orderProductDetails");
const mongoose = require('mongoose');
var async = require("async");

exports.saveOrder = (req, res, next) => {
  var last_order_id;
  orderService.getLastOrderId()
  .then(lastOrder => {
    console.log("Last Order: ",lastOrder);
    last_order_id = lastOrder[0].order_number + 1;
    console.log("Order id: ",last_order_id);
  })
  orderProductDeatailService.saveOrderProductDetails(req.body.order_products)
    .then(orderProduct => {
      var product_object = orderProduct._id;
      orderService
        .saveOrder(req.body, product_object,last_order_id)
        .then(Order => {
          res.status(200).json(Order);
        });
    })
};

exports.getAllOrders = (req, res, next) => {
  
  let orderList =[];
  orderService
    .getAllOrder()
    .then(orders => {
      let i = 0;
      if (orders.length === 0) {
        res.status(200).json(orders);
      } else {
        async.eachSeries(orders, function (order, callback) {
          orderProductDeatailService
            .getOrderProductDetailsByQuery({ _id: order.order_products })
            .then(proDetails => {
              let finalOrder = Object.assign({}, order._doc, { order_products: proDetails[0] });
              orderList.push(finalOrder);
              if (orders.length - 1 === i) {
                res.status(200).json({data:orderList});
              }
              ++i;
              callback();
            })
            .catch(next);
        });
      }
    })
    .catch(error=>{
      console.log("Get All Orders Error: ",error);
    });
};

exports.getAllOrdersByLimit = (req, res, next) => {
  let offset = req.body.offset;
  let limit = req.body.limit;
  let countValue;
  let orderList =[];
  orderService.getOrdersCount()
  .then(count => {
    countValue = count;
  })
  orderService
    .getOrderByQuery(offset,limit)
    .then(orders => {
      let i = 0;
      if (orders.length === 0) {
        res.status(200).json(orders);
      } else {
        async.eachSeries(orders, function (order, callback) {
          orderProductDeatailService
            .getOrderProductDetailsByQuery({ _id: order.order_products })
            .then(proDetails => {
              // console.log('prod: ',proDetails[0]);
              let finalOrder = Object.assign({}, order._doc, { order_products: proDetails[0] });
              orderList.push(finalOrder);
              if (orders.length - 1 === i) {
                res.status(200).json({data:orderList,offset:offset,limit:limit,count:countValue});
              }
              ++i;
              callback();
            })
            .catch(next);
        });
      }
    })
    .catch(error=>{
      console.log("Get All Orders Error: ",error);
    });
};