const adminModel = require("../model/adminModel")

const login = async (req , res)=>{
    try{
        const {id , password} = req.body
        const data= await adminModel.findOne({adminId : id})
       
        if(!data)
        {
            return res.json({got :false , message: "Invalid Admin Id"})
        }
        else{
            if(data.password != password)
            {
                res.json({
                    got:false, 
                    message:"Incorrect Password"
                })
            }
            else{
                req.session.admin = data;
                res.json({got:true , data:data , message :"Login successful"})
            }
        }
    }
    catch(e)
    {
        console.log(e);
        res.json({got:false, message:"Somthing went wrong"})
    }
}

const logout = async (req , res)=>{
    try{
        if(!req.session.admin)
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

const getAdmin = async (req , res)=>{
    try{
        if(!req.session.admin)
        {
            return res.json({valid :false})
        }
        else{
            res.json({valid:true , value :req.session.admin})
        }
    }
    catch(e)
    {
        console.log(e);
        
    }
}

module.exports = {
    login ,
    getAdmin,
    logout
}