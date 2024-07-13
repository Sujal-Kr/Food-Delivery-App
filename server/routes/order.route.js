const express = require('express');
const orderRouter=express.Router();
const {placeOrder, verifyOrder, userOrder, listOrders,updateOrderStatus}=require('../controllers/order.controller')
const protectRoute = require('../middleware/auth')



orderRouter
.route('/place')
.post(protectRoute,placeOrder)


orderRouter
.route('/verify')
.post(verifyOrder)


orderRouter
.route('/userorders')
.get(protectRoute,userOrder)

orderRouter
.route('/listorders')
.get(listOrders)

orderRouter
.route('/status')
.patch(updateOrderStatus)


module.exports = orderRouter
