const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const KEY = process.env.JWT_KEY
const bcrypt = require('bcrypt')


const singUp = async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        const registered = await userModel.findOne({ email: data.email })
        if (registered) {
            return res.json({
                success: false,
                message: "user already registered"
            })
        }
        else {
            const user = await userModel.create(data)
            if (user) {
                return res.json({
                    success: true,
                    message: "user registered successfully",
                    data: user
                })
            } else {
                return res.json({
                    success: false,
                    message: "user registration failed",
                })
            }
        }

    } catch (err) {
        console.log(err.message);
        return res.json({
            success: false,
            message: "Error " + err.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (user) {
            if (bcrypt.compare(password, user.password)) {
                const id = user._id
                const token = jwt.sign({ payload: id }, KEY)
                res.cookie("token", token, )
                return res.json({
                    success: true,
                    message: "user logged in successfully",
                    data: user,
                    token
                })

            } else {
                res.json({
                    success: false,
                    message: "wrong credential"
                })
            }
        } else {
            return res.json({
                success: false,
                message: "user not registered ",
            })
        }
    } catch (err) {
        return res.json({
            success: false,
            message: "Error " + err.message
        })
    }
}


const logout = async (req, res) => {
    res.cookie("token", "")
    return res.json({
        success: true,
        message: "user logged out successfuly"
    })
}

module.exports = {
    singUp,
    login,
    logout
}

