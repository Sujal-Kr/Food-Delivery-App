const foodModel = require('../models/food.model')
const fs = require('fs')

const addFood = async (req, res) => {
    try {

        const data = req.body;
        const image = req.file.filename;
        const food = await foodModel.create({ ...data, image });

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
            fs.unlink(`upload/${data.image}`, (err) => {
                if (err) throw new Error(err.message)
                console.log(`${data.image} Deleted Successfully`)
            })
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