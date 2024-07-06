const express=require('express')
const dotenv=require('dotenv')
const cors =require('cors')
dotenv.config()
require('./config/index')
const cookie=require('cookie-parser')


const app = express()
const PORT=process.env.PORT || 4000
app.use(express.json())

app.use(cors())

app.use(cookie())


app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})


const foodRouter=require('./routes/food.route')
app.use('/api/food',foodRouter)
app.use('/images',express.static("upload"))

const userRouter=require('./routes/user.route')
app.use('/api/user',userRouter)
