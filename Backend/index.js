const express = require("express");
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")
const cookie = require("cookie-parser")
const session = require("express-session")
const nodemailer = require('nodemailer');
const employeeModel = require("./model/useModel")

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(bodyParser.json())

app.use(cookie())

app.use(session({
    resave:false,
    saveUninitialized:false,
    secret: process.env.SECRET_SESSION_KEY,
    
    cookie:{
        secure:false,
        maxAge: 1000* 60 * 60*60,
    }
}))


const conn = mongoose.connect(process.env.MONGO_URL)
.then((res)=>{
  console.log("connected to database");
  
})




//route of api request
const empRoute = require("./routes/employee")
const adminRoute = require ("./routes/admin");
const attendenceRoute = require("./routes/attendence")
const detailRoute = require("./routes/detail")
const empLogin = require("./routes/empLogin")
const employeeQuerryRoute = require("./routes/employeeQuerry")


//making request
app.use("/employee" , empRoute);
app.use("/admin" , adminRoute);
app.use("/attendence" , attendenceRoute)
app.use("/detail" , detailRoute)
app.use("/emp-login" , empLogin)
app.use("/emp-querry" , employeeQuerryRoute)


const transporter = nodemailer.createTransport({
    service: 'gmail',  //or use other email services like Outlook, Yahoo, etc.
    // host:"smtp.gmail.com",
    port: 465,
    secure:true,
    auth: {
      user: 'aayushjha0112@gmail.com',
      // pass: 'vaib jhcd sqvk zulm',
      pass: 'wnxg clqz spmu geud',
    },
    tls: {
      rejectUnauthorized: false,
    },
    debug: true, // Enable debug output
    logger: true,
  });

  app.post('/otp', async (req, res) => {
    try{
      const { email} = req.body;

      const data = await employeeModel.findOne({email:email})
  
      if(!data)
      {
          return res.json({got:false , value:"" , message:"No Employee Found"})
      }
      const value = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
  
      const mailOptions = {
        from: 'aayushjha0112@gmail.com',
        to: email, // Recipient's email
        subject: "Verification Code", // Email subject
        text: "code:"+value, // Email message
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          
          return res.status(500).json({got:false , value:"" , message:"Something went wrong" , error:error})
        } else {
          return res.status(200).json({got:true , value:""+value , message:"OTP send Successfully"})
        }
      });
    }
    catch(e)
    {
      res.json({got:false , message:"Please Try again later" ,value:""})
    }
  });

app.listen(process.env.PORT , ()=>{
    console.log("listning on port " + process.env.PORT)
})