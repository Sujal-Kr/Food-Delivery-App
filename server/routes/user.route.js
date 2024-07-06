const express = require('express')
const { singUp, login } = require('../controllers/user.controller')


const userRouter = express.Router()

userRouter
.route('/signup')
.post(singUp)


userRouter
.route('/login')
.post(login)



module.exports = userRouter