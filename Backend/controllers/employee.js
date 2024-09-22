const attendence = require("../model/attendence");
const employeeModle = require("../model/useModel")

const fetchDetail = async (req , res)=>{
    try{
        const {empId , firstName , lastName} = req.body;
        if(!empId)
        {
            const data = await employeeModle.findOne({
                firstName: firstName,
                lastName: lastName,
            });            
            if(!data)
            {
                return res.json({got: false ,message: "No record found"})
            }
            else{
                return res.json({got:true , message:"Successfully fetched" , firstName : data.firstName , lastName : data.lastName , empId:data.empId})
            }
        }
        else{
            const data = await employeeModle.findOne({empId : empId});
            if(!data)
            {
                return res.json({got: false ,message: "No record found"})
            }
            else{
                return res.json({got:true , message:"Successfully fetched" , firstName : data.firstName , lastName : data.lastName , empId:data.empId})
            }
        }

    }
    catch(e)
    {
        console.log(e);
        
    }
}
// const markAttendence = async (req , res)=>{
//     try{
//         const data = await employeeModle.findOne({empId : req.body.empId});
       
//         if(!data)
//         {
//             return res.json({got: false , message:"No Record found"})
//         }
//         else{
//             if(data.password !== req.body.password)
//             {
//                 return res.json({got: false , message:"Incorrect Password"})
//             }
//             else{
//                 const date = new Date()
//                 let day = date.getDate()
//                 let month = date.getMonth()
//                 let year = date.getFullYear()

//                 const attendenceData = await attendence.findOne(
//                     {
//                         empId:req.body.empId , 
//                         present:{
//                             date:day , 
//                             month:month+1,
//                             year:year
//                         }
//                     })

//                 if(!attendenceData)
//                 {
//                     await attendence.updateOne({empId:req.body.empId} , {
//                         $push:{present:{date:day , month:month+1 , year}},
                        
//                         $pull:{absent:{date:day , month:month+1 , year }}
//                     })
//                     return res.json({got:true , message:"Attendence Marked Successfully"})
//                 }
//                 else{
//                     return res.json({got:true , message:"Attendence Already Marked"})
//                 }
//             }
//         }
//     }
//     catch(e)
//     {
//         console.log(e);
//         res.json({got:false , message:"something went wrong"})
//     }
// }


const markAttendence = async (req , res)=>{
    try{
        const data = await employeeModle.findOne({empId : req.body.empId});
        const data2 = await attendence.findOne({empId: req.body.empId})
        const date = new Date()
                let day = date.getDate()
                let month = date.getMonth()
                let year = date.getFullYear()
        const marker = data2.absent.find(a => a.date == day && a.month == month+1 && a.year == year)
        
        console.log(marker);
        
        if(!data)
        {
            return res.json({got: false , message:"No Record found"})
        }
        else if(marker?.marked)
        {
            return res.json({got: false , message:"You are Marked Absent By Admin"})
        }
        else if(marker?.markedLeave)
        {
            return res.json({got: false , message:"Leave is allocated to you for this day. For changes contact admin"})
        }
        else{

                const attendenceData = await attendence.findOne(
                    {
                        empId:req.body.empId , 
                        present:{
                            date:day , 
                            month:month+1,
                            year:year
                        }
                    })

                if(!attendenceData)
                {
                    await attendence.updateOne({empId:req.body.empId} , {
                        $push:{present:{date:day , month:month+1 , year}},
                        
                        $pull:{absent:{date:day , month:month+1 , year }}
                    })
                    return res.json({got:true , message:"Attendence Marked Successfully"})
                }
                else{
                    return res.json({got:true , message:"Attendence Already Marked"})
                }
            }
        
    }
    catch(e)
    {
        console.log(e);
        res.json({got:false , message:"something went wrong"})
    }
}

module.exports = {
    fetchDetail,
    markAttendence
}