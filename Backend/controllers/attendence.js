const attendence = require("../model/attendence")

const getPresentEmp = async (req , res)=>{
    try{
        const {date , month , year} = req.body;
        const attendenceData = await attendence.find({
            present: {
              $elemMatch: { date, month , year}
            }
          });

          res.json(attendenceData)
    }
    catch(e)
    {
        console.log(e);
        res.json([])
        
    }
}
const getAbsentEmp = async (req , res)=>{
    try{
        const {date , month , year} = req.body;
        const attendenceData = await attendence.find({
            absent: {
              $elemMatch: { date, month , year}
            }
          });

          res.json(attendenceData)
    }
    catch(e)
    {
        console.log(e);
        res.json([])
        
    }
}

const markAbsent = async (req , res)=>{
    try{
        const {date , month , year , empId} = req.body
        await attendence.updateOne({empId: empId} , {
            $pull:{
                present :{date , month , year}
            },
        })

        await attendence.updateOne({empId: empId} , {
            $pull:{
                absent:{date , month , year}
            },
        })

        await attendence.updateOne({empId:empId},
            {
                $push:{
                    absent:{date , month , year , leave:false , marked:true}
                }
            }
        )

        res.json({complete:true})
    }
    catch(e)
    {
        console.log(e);
        res.json({complete:false})
    }
}

const markLeave = async (req , res)=>{
    try{
        const {empId , date , month , year , leaveType} = req.body

        await attendence.updateOne({empId:empId} , 
            {
                $pull:{
                    absent:{date , month , year}
                }
            }
        )

        await attendence.updateOne({empId:empId} , 
            {
                $push:{
                    absent:{date , month , year , leave:true , leaveType:leaveType}
                }
            }
        )

        res.json({completed:true})
    }
    catch(e)
    {
        console.log(e);
        res.json({complete:false})
    }
}

const markPresent = async(req , res)=>{
    try{
        const {date , month , year , empId} = req.body;

        await attendence.updateOne({empId:empId},{
            $pull:{
                absent:{date , month , year}
            },
        })
        
        await attendence.updateOne({empId:empId},{
            $push:{
                present:{date , month , year}
            },
        })
        

        return res.json({complete:true})
    }
    catch(e)
    {
        console.log(e);
        return res.json({complete:false})
        
    }
}
module.exports ={
    getPresentEmp,
    getAbsentEmp,
    markAbsent,
    markLeave,
    markPresent
}