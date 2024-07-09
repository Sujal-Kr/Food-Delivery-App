const orderModel=require('../models/order.model')
const userModel=require('../models/user.model')
const KEY=process.env.STRIPE_KEY
const stripe = require('stripe')(KEY)

// placing order from frontend

const placeOrder=async(req,res)=>{
    const url="https://localhost:5173"
    const {address,amount,items}=req.body
    const id=req.id
    try{
        const newOrder=await orderModel.create({address:address,amount:amount,items:items})
        if(newOrder){
            await userModel.findByIdAndUpdate(id,{
                cart:{}
            })

            const line_items = items.map((item) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item.name
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.quantity
                };
            })
            line_items.push({
                price_data:{
                    currency:'inr',
                    product_data:{
                        name:"Delivery Charges",
                    },
                    unit_amount:20
                },
                quantity:1
            })

            const session=await stripe.checkout.sessions.create({
                line_items: line_items,
                mode:'payment',
                success_url:`${url}/verify?success=true&orderId${newOrder._id}`,
                cancel_url:`${url}/verify?success=false&orderId${newOrder._id}`
            })
            return res.json({
                success:true,
                url:session.url
            })
        }
    }catch(err){
        return res.json({
            success:false,
            message:"Error: "+err.message
        })
    }

}

module.exports ={
    placeOrder,
}
