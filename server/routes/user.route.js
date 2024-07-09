const express = require('express')
const { singUp, login,logout} = require('../controllers/user.controller')


const userRouter = express.Router()

userRouter
.route('/signup')
.post(singUp)


userRouter
.route('/login')
.post(login)

userRouter
.route('/logout')
.get(logout)



module.exports = userRouter