const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    firstName : String,
    lastName :String,
    adminId : String,
    email:String,
    password:String
})

const adminModel = mongoose.model("adminModel" , adminSchema);

module.exports = adminModel;