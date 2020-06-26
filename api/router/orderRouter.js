/* Designed By:Ganesan M
* date:19_12_19
* modified:-
*/

/**  Import Module*/
const express = require('express');
const routes =express.Router();

const orderController = require('../controller/orderController');
const order = require('../model/order');


routes.post('/createOrder', orderController.saveOrder);
routes.post('/getAllOrdersByLimit', orderController.getAllOrdersByLimit);
routes.get('/getAllOrders', orderController.getAllOrders)
module.exports = routes;




