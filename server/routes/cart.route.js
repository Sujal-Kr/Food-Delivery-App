const express= require('express')
const {addToCart,removeFromCart,getCart}=require('../controllers/cart.controller') 
const protectRoute=require('../middleware/auth')
const cartRouter=express.Router();


cartRouter.use(protectRoute)
cartRouter
.route('/add')
.post(addToCart)


cartRouter
.route('/remove')
.post(removeFromCart)

cartRouter
.route('/list')
.get(getCart)




module.exports =cartRouter