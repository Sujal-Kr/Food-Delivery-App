const express = require('express');
const { addFood ,getAllFood, removeFood} = require('../controllers/food.controller');
const multer = require('multer');

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

foodRouter
    .route('/add')
    .post(upload.single("image"), addFood);

foodRouter
.route('/list')
.get(getAllFood)

foodRouter
.route('/remove')
.delete(removeFood);



module.exports = foodRouter;
