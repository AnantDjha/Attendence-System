const mongoose = require("mongoose")

const empSchema = mongoose.Schema({
    firstName : String,
    lastName :String,
    empId : String,
    email:String,
    password:String
})

const employeeModle = mongoose.model("employeeModle" , empSchema);

module.exports = employeeModle;