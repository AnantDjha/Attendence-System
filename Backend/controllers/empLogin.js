const employeeModle = require("../model/useModel")

const login = async(req , res)=>{
    try{
        const {email} = req.body

        const data = await employeeModle.findOne({email:email})

        req.session.employee = data
        res.json({got:true , data:{valid:true , value:data}, message:"Successfull"} )
    }
    catch(e)
    {
        console.log(e);
        res.json({got:false, message:"something went wrong"})
    }
}

const getEmployee = async (req , res)=>{
    try{
        if(!req.session.employee)
        {
            return res.json({valid :false})
        }
        else{
            res.json({valid:true , value :req.session.employee})
        }
    }
    catch(e)
    {
        console.log(e);
        
    }
}

const logout = async (req , res)=>{
    try{
        if(!req.session.employee)
        {
            return res.json({completed:true})
        }

        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.json({completed:false});
            }
            
            res.status(200).json({completed:true});
        });
    }
    catch(e)
    {
        console.log(e);
        res.json({completed:false})
    }
}


module.exports = {
    login,
    getEmployee,
    logout
}