const mongoose = require('mongoose')
const validator = require('email-validator')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true,"Already exists"],
        validate: [function () {
            validator.validate(this.email)
        }, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must be at least 8 Character"],

    },
    cart:{
      type:Object,
      default: {}  
    }
},{minimize: false})




userSchema.pre('save', async function(){
    const salt=await bcrypt.genSalt()
    const hash= await bcrypt.hash(this.password,salt)
    this.password = hash
})



const userModel=mongoose.models.user||mongoose.model('user',userSchema)
module.exports =userModel