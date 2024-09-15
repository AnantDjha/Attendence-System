const mongoose = require("mongoose");

const attendenceSchema = mongoose.Schema({
    empId:String,
    dayOfWork:Number,
    present:[Object],
    absent:[Object]
})

const attendence = mongoose.model("attendence" , attendenceSchema)

module.exports = attendence;