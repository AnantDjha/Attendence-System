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
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET_SESSION_KEY,

  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 60,
  }
}))


const conn = mongoose.connect(process.env.MONGO_URL)
  .then((res) => {
    console.log("connected to database");

  })




//route of api request
const empRoute = require("./routes/employee")
const adminRoute = require("./routes/admin");
const attendenceRoute = require("./routes/attendence")
const detailRoute = require("./routes/detail")
const empLogin = require("./routes/empLogin")
const employeeQuerryRoute = require("./routes/employeeQuerry");
const sendMail = require("./email/emial");


//making request
app.use("/employee", empRoute);
app.use("/admin", adminRoute);
app.use("/attendence", attendenceRoute)
app.use("/detail", detailRoute)
app.use("/emp-login", empLogin)
app.use("/emp-querry", employeeQuerryRoute)


const transporter = nodemailer.createTransport({
  service: 'gmail',  //or use other email services like Outlook, Yahoo, etc.
  // host:"smtp.gmail.com",
  port: 465,
  secure: true,
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
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const data = await employeeModel.findOne({ email });
    if (!data) {
      return res.status(404).json({ got: false, value: "", message: "No Employee Found" });
    }

    // Generate a 6-digit OTP
    const value = Math.floor(100000 + Math.random() * 900000);

    console.log(value);

    await sendMail(email, "Otp for verification",
      `Here is your OTP : ${value}`
    )

    return res.status(200).json({ got: true, value: value.toString(), message: "OTP sent successfully" });

  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ got: false, value: "", message: "Something went wrong. Please try again later." });
  }
});

app.listen(process.env.PORT, () => {
  console.log("listning on port " + process.env.PORT)
})