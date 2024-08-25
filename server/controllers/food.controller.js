const foodModel = require('../models/food.model')
const cloudinary = require('../util/cloudinary')
// const fs = require('fs')

const addFood = async (req, res) => {
    try {

        const data = req.body;
        const path=req.file.path;
        const result=await cloudinary.uploader.upload(path)
        
        if(!result) {
            return res.json({
                message: 'Could not upload image',
                success: false
            })
        }
        const food = await foodModel.create({ ...data, image:result.secure_url,cloudinary_id:result.public_id });

        if (food) {
            return res.json({
                success:true,
                message: "Data Inserted",
                data: food
            });
        } else {
            return res.json({
                success:false,  
                message: "Oops, something went wrong",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Failure: " + err.message
        });
    }
};



const getAllFood = async (req, res) => {
    try {
        const data = await foodModel.find()
        if (data) {
            return res.json({
                success: true,
                message: "Data Retrieved",
                data
            })
        } else {
            return res.json({
                success: false,
                message: "No data Found"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error: " + err.message
        })
    }
}
const removeFood = async (req, res) => {

    try {
        const { id } = req.body;
        const data = await foodModel.findByIdAndDelete(id)
        if (data) {
            const result=await cloudinary.uploader.destroy(data.cloudinary_id)
            console.log(result)
            return res.json({
                success: true,
                message: "Food Deleted Successfully",
                data
            })
        } else {
            return res.json({
                success: false,
                message: "Data Not Found"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error: " + err.message

        })
    }
}
module.exports = {
    addFood,
    removeFood,
    getAllFood
}