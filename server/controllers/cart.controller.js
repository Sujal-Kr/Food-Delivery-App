const userModel = require('../models/user.model')

// add items to cart
const addToCart = async (req, res) => {
    const itemId  = req.body.id
    try {
        const user = await userModel.findById(req.id)
        const cart  = await user.cart
        console.log("cart", cart)
        if (!cart[itemId]) {
            cart[itemId] = 1
        } else {
            cart[itemId] += 1
        }
        const updated = await userModel.findByIdAndUpdate(req.id, { cart })
        console.log(updated);
        if (updated) {
            return res.json({
                success: true,
                message: "added to cart successfully"
            })
        } else {
            return res.json({
                success: false,
                message: "cart not updated!!"
            })
        }
    } catch (err) {
        res.json({
            success: false,
            message: "Error" + err.message
        })
    }
}

// remove items from cart
const removeFromCart = async (req, res) => {
    try {
        const id = req.id
        const user = await userModel.findById(id)
        const cart  = await user.cart
        const itemId  = req.body.id
        if (!cart[itemId]) {
            return res.json({
                success: false,
                message: "item not found"
            })
        } else {
            if (cart[itemId] > 0) {
                cart[itemId] -=1
            }
            const updated = await userModel.findByIdAndUpdate(req.id, { cart })
            if (updated) {
                return res.json({
                    success: true,
                    message: "item removed successfuly",
                    data: updated
                })
            }
        }

    } catch (err) {
        return res.json({
            success: false,
            message: "Error: " + err.message
        })
    }
}

//get the current cart
const getCart = async (req, res) => {
    try {
        console.log("user id ",req.id)
        const user = await userModel.findById(req.id)
        const cart  = await user
        return res.json({
            success: true,
            message: "cart retrived successfuly",
            data: cart
        })
    } catch (err) {
        return res.json({
            success: false,
            message: "Error: " + err.message
        })
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    getCart
}