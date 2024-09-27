const employeeQuerries = require("../model/employeeQuerry");
const employeeModle = require("../model/useModel");
const attendence = require("../model/attendence");
const sendMail = require("../email/emial");



const addQuerry = async (req, res) => {
    try {
        const { empId, describe, subject, leave , leaveType } = req.body;
        const user = await employeeModle.findOne({ empId: empId });
        const d = new Date();
        const haveQuerry = await employeeQuerries.findOne({empId:empId});


        if (!user) {
            return res.json({ completed: false, message: "Something went wrong" })
        }
        if(haveQuerry)
        {
            return res({completed:false, message:"You have already a open application"})
        }

        if (leave) {
            let mm = d.getMonth() + 1;
            let data = new employeeQuerries({
                empId,
                firstName: user.firstName,
                lastName: user.lastName,
                heading: subject,
                content: describe,
                initalizeOn: d.getFullYear() + "-" + (mm < 10 ? "0" + mm : mm) + "-" + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()),
                leaveDate: { date: leave, type: leaveType }
            })
            data.save();

            res.json({ completed: true, message: "Querry created succesfully" })
        }
        else {
            let mm = d.getMonth() + 1;
            let data = new employeeQuerries({
                empId,
                firstName: user.firstName,
                lastName: user.lastName,
                heading: subject,
                content: describe,
                initalizeOn: d.getFullYear() + "-" + (mm < 10 ? "0" + mm : mm) + "-" + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()),
            })
            data.save();
            res.json({ completed: true, message: "Leave Application is Submitted" })

        }
    }
    catch (e) {
        console.log(e);
        return res.json({ completed: false, message: "Something went wrong" })

    }
}


const getQuerry = async (req, res) => {
    try {
        const data = await employeeQuerries.find({});

        res.json(data);
    }
    catch (e) {
        console.log(e);
        res.json([])
    }
}

const acceptLeaveChange = async (req, res) => {
    try {
        const { empId, dateStr } = req.body
        const [year, month, date] = dateStr.split("-");
        const data = await attendence.findOne({ empId: empId })
        const personalData = await employeeModle.findOne({ empId: empId })

        if (!data) {
            return res.json({ completed: false, message: "something went wrong" })
        }
        else {
            let result = await attendence.updateOne({ empId: empId }, {
                $pull: {
                    absent: { date: parseInt(date), month: parseInt(month), year: parseInt(year) }
                }
            })
            let result2 = await attendence.updateOne({ empId: empId }, {
                $push: {
                    present: { date: parseInt(date), month: parseInt(month), year: parseInt(year) }
                }
            })


            if (result.acknowledged && result2.acknowledged) {
                const prevData = await employeeQuerries.findOneAndDelete({
                    empId: empId, initalizeOn: new Date(dateStr)
                }, { returnDocument: 'before' })

                console.log(prevData);
                
                await sendMail(personalData.email, "The Querry Regarding the Attendence failure is Accepted",
                    `We got Your concern\n\n${prevData?.heading}\n\n${prevData?.content}\n\nYour concern is accepted and Successfully marked Present for date ${new Date(prevData?.initalizeOn).toLocaleDateString()}`
                )

              
                return res.json({ completed: true, message: "Attendence Marked Successfully" })
            }

            return res.json({ completed: false, message: "Something went wrong" });
        }
    }
    catch (e) {
        console.log(e);
        res.json({ completed: false, message: "something went wrong" })

    }
}

const reject = async (req , res)=>{
    try
    {
        const { empId, dateStr } = req.body
        
        const personalData = await employeeModle.findOne({ empId: empId })

        const prevData = await employeeQuerries.findOneAndDelete({
            empId: empId, initalizeOn: new Date(dateStr)
        }, { returnDocument: 'before' })

        await sendMail(personalData.email, "The application is rejected",
            `We got Your concern\n\n${prevData?.heading}\n\n${prevData?.content}\n\nYour concern is rejected for date ${new Date(prevData?.initalizeOn).toLocaleDateString()} due to some issue for further information contact admin.`
        )
        res.json({completed:true, message:"Application Rejected"})
    }
    catch(e)
    {
        return res.json({completed:false , message:"something went wrong"})
    }
}

const accecptLeaveApplication = async (req , res)=>{
    try{
        const { empId, dateStr , leaveDate , leaveType} = req.body
        const [year, month, date] = leaveDate.split("-");
        const data = await attendence.findOne({ empId: empId })
        const personalData = await employeeModle.findOne({ empId: empId })

        if(!data)
        {
            return res.json({complted :false , message : "something went wrong"})
        }

        const result = await attendence.updateOne({empId:empId} , {
            $push:{
                absent:{date:parseInt(date) , month:parseInt(month) , year:parseInt(year) , leave:true , holiday:false , leaveType:leaveType }
            }
        })
        
        if(result.acknowledged)
        {
            const prevData = await employeeQuerries.findOneAndDelete({
                empId: empId, initalizeOn: new Date(dateStr), heading: "Apply for Leave"
            }, { returnDocument: 'before' })

            await sendMail(personalData.email, "Application for leave",
                `We got Your Leave Application\n\n${prevData?.heading}\n\n${prevData?.content}\n\nYour Application is Accepted and  leave is allocated to you for date ${new Date(prevData?.leaveDate).toLocaleDateString()}`
            )

            return res.json({completed:true, message:"Leave Allocated"})
        }
        res.json({complted:false , message :"something went wrong"})
    }
    catch(e)
    {
        return res.json({completed:false , message:"something went wrong"})
    }
}

module.exports = {
    addQuerry,
    getQuerry,
    acceptLeaveChange,
    reject,
    accecptLeaveApplication
}