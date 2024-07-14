const express=require('express')
const dotenv=require('dotenv')
const cors =require('cors')
dotenv.config()
require('./config/index')
const cookie=require('cookie-parser')


const app = express()
const PORT=process.env.PORT || 4000
app.use(express.json())

app.use(cors());

app.use(cookie())

app.use('/images',express.static("upload"))

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})

app.get('/',(req,res)=>{
    res.send({
        message:"hello world"
    })
})


const foodRouter=require('./routes/food.route')
app.use('/api/food',foodRouter)

const userRouter=require('./routes/user.route')
app.use('/api/user',userRouter)


const cartRouter=require('./routes/cart.route')
app.use('/api/cart',cartRouter)

const orderRouter=require('./routes/order.route')
app.use('/api/order',orderRouter)
