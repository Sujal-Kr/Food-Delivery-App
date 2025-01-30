const orderModel = require('../models/order.model')
const userModel = require('../models/user.model')
const KEY = process.env.STRIPE_KEY
const stripe = require('stripe')(KEY)

// placing order from frontend

const placeOrder = async (req, res) => {
    const url = "https://quickbite-chi.vercel.app"
    const { address, amount, items } = req.body
    const id = req.id
    try {
        const newOrder = await orderModel.create({ userId: id, address: address, amount: amount, items: items })
        if (newOrder) {
            await userModel.findByIdAndUpdate(id, {
                cart: {}
            })

            const line_items = items.map((item) => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.quantity
                };
            })
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: "Delivery Charges",
                    },
                    unit_amount: 20
                },
                quantity: 1
            })

            const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                mode: 'payment',
                success_url: `${url}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${url}/verify?success=false&orderId=${newOrder._id}`
            })
            return res.json({
                success: true,
                session_url: session.url
            })
        }
    } catch (err) {
        return res.json({
            success: false,
            message: "Error: " + err.message
        })
    }

}

const verifyOrder = async (req, res) => {
    const { success, orderId } = req.body
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            return res.json({
                success: true,
                message: "Paid"
            })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            return res.json({
                success: false,
                message: "Not Paid"
            })
        }
    } catch (err) {
        return res.json({
            success: false,
            message: "Error: " + err.message
        })
    }
}

const userOrder = async (req, res) => {
    try {
        const id = req.id
        const orders = await orderModel.find({ userId: id })
        return res.json({
            success: true,
            message: "orders retrieved successfully",
            data: orders
        })
    } catch (err) {
        return res.json({
            success: false,
            message: "Error: " + err.message
        })
    }
}

const listOrders = async (req, res) => {
    const orders = await orderModel.find()
    try {
        if (orders) {
            return res.json({
                success: true,
                message: "Orders retrieved successfully",
                data: orders
            })
        } else {
            return res.json({
                success: false,
                message: "No orders not found!!"
            })
        }
    } catch (err) {
        return res.json({
            success: false,
            message: "Error: " + err.message
        })
    }
}

const updateOrderStatus = async (req, res) => {
    const { id, status } = req.body
    try {
        const order = await orderModel.findByIdAndUpdate(id, { status: status })
        if (order) {
            return res.json({
                success: true,
                message: "Order updated successfully"
            })
        } else {
            return res.json({
                success: false,
                message: "Order not found",
            })
        }

    } catch (err) {
        return res.json({
            success: false,
            message: "Error: " + err.message
        })
    }
}
module.exports = {
    placeOrder,
    verifyOrder,
    userOrder,
    listOrders,
    updateOrderStatus
}
