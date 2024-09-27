const mongoose = require('mongoose');

const querrySchema = mongoose.Schema({
    empId: {type:String , required:true},
    firstName : {type:String , required:true} ,
    lastName : {type:String , required:true},
    heading :{type:String , required:true},
    content:{type:String , required:true},
    initalizeOn : {type:Date , required:true},
    leaveDate : Object
})

const employeeQuerries = mongoose.model("employeeQuerries" , querrySchema);

module.exports = employeeQuerries