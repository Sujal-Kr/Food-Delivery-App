const express = require('express');
const orderRouter=express.Router();
const {placeOrder}=require('../controllers/order.controller')
const protectRoute = require('../middleware/auth')



orderRouter
.route('/place')
.post(protectRoute,placeOrder)

module.exports = orderRouter