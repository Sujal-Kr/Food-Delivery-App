const mongoose = require('mongoose')
const URL=process.env.URL

mongoose.connect(URL).then(db=>{
    console.log("Connected to Database ");
}).catch(error=>{
    console.log("error: " + error);
})
