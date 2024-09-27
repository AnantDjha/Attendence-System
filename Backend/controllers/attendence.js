const attendence = require("../model/attendence")

const getPresentEmp = async (req, res) => {
    try {
        const { date, month, year } = req.body;
        const attendenceData = await attendence.find({
            present: {
                $elemMatch: { date, month, year }
            }
        });

        res.json(attendenceData)
    }
    catch (e) {
        console.log(e);
        res.json([])

    }
}
const getAbsentEmp = async (req, res) => {
    try {
        const { date, month, year } = req.body;
        const attendenceData = await attendence.find({
            absent: {
                $elemMatch: { date, month, year }
            }
        });

        res.json(attendenceData)
    }
    catch (e) {
        console.log(e);
        res.json([])

    }
}

const markAbsent = async (req, res) => {
    try {
        const { date, month, year, empId } = req.body
        await attendence.updateOne({ empId: empId }, {
            $pull: {
                present: { date, month, year }
            },
        })

        await attendence.updateOne({ empId: empId }, {
            $pull: {
                absent: { date, month, year }
            },
        })

        await attendence.updateOne({ empId: empId },
            {
                $push: {
                    absent: { date, month, year, leave: false, marked: true }
                }
            }
        )

        res.json({ complete: true })
    }
    catch (e) {
        console.log(e);
        res.json({ complete: false })
    }
}

const markLeave = async (req, res) => {
    try {
        const { empId, date, month, year, leaveType } = req.body

        if (!empId) {
            await attendence.updateMany({
                absent: {
                    $elemMatch: { date, month, year }
                }
            }, {
                $pull: {
                    absent: { date, month, year }
                }
            })

            await attendence.updateMany({
                present: { $not: { $elemMatch: { date, month, year } } }
            },
                {
                    $push: {
                        absent: { date, month, year, leave: true, leaveType, holiday: true, markedLeave: true }
                    }
                })
            return res.json({ complete: true })
        }

        await attendence.updateOne({ empId: empId },
            {
                $pull: {
                    absent: { date, month, year }
                }
            }
        )

        await attendence.updateOne({ empId: empId },
            {
                $push: {
                    absent: { date, month, year, leave: true, leaveType: leaveType, markedLeave: true, holiday: false }
                }
            }
        )

        res.json({ completed: true })
    }
    catch (e) {
        console.log(e);
        res.json({ complete: false })
    }
}

const markPresent = async (req, res) => {
    try {
        const { date, month, year, empId } = req.body;

        await attendence.updateOne({ empId: empId }, {
            $pull: {
                absent: { date, month, year }
            },
        })

        await attendence.updateOne({ empId: empId }, {
            $push: {
                present: { date, month, year }
            },
        })


        return res.json({ complete: true })
    }
    catch (e) {
        console.log(e);
        return res.json({ complete: false })

    }
}

const markAbsentForToday = async (req, res) => {
    try {

        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();

        const data = await attendence.findOne({
            absent: {
                $not: { $elemMatch: { date, month, year } }
            },
            present:{
                $not: { $elemMatch: { date, month, year } }
            }
        })

        if(data)
        {
            console.log(".......")
            await attendence.updateMany({
                absent: {
                    $not: { $elemMatch: { date, month, year } }
                },
                present:{
                    $not: { $elemMatch: { date, month, year } }
                }
            }, {
                $push: {
                    absent: { date, month, year, leave: false }
                }
            })

           return  res.json({ completed: true })  
        }

        return res.json({completed: false})
    }
    catch (e) {
        console.log(e);
        res.json({ completed: false })
    }
}
module.exports = {
    getPresentEmp,
    getAbsentEmp,
    markAbsent,
    markLeave,
    markPresent,
    markAbsentForToday
}