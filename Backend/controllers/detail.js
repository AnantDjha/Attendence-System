const employeeModle = require("../model/useModel")
const attendence = require("../model/attendence")

const getPersonalDetail = async (req , res)=>{
    try{
        const {empId} = req.body

        const data = await employeeModle.findOne({empId:empId})

        if(!data)
        {
            return res.json({completed:false , value:null})
        }
        else{
            res.json({completed:true , value:data})
        }
    }
    catch(e)
    {
        console.log(e);
        res.json({completed:false, value:null})
    }
}

const getAttendenceDetail = async (req , res)=>{
    try{
        const {empId , month} = req.body
        const data = await attendence.findOne({empId:empId})

        if(!data)
        {
            return res.json({completed:false , value:null})
        }
        else{
            let pArr = data.present;
            let aArr = data.absent;

            pArr = pArr.filter(a => a.month == month)
            aArr = aArr.filter(a => a.month == month)

            res.json({completed:true , value:{present:pArr , absent:aArr}})
        }
    }
    catch(e)
    {
        console.log(e);
        return res.json({completed:false , value:null})
        
    }
}
module.exports = {
    getPersonalDetail,
    getAttendenceDetail
}