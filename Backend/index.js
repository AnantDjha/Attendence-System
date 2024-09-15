const express = require("express");
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")
const cookie = require("cookie-parser")
const session = require("express-session")

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

//route of api request
const empRoute = require("./routes/employee")
const adminRoute = require ("./routes/admin");
const attendenceRoute = require("./routes/attendence")
const detailRoute = require("./routes/detail")

//making request
app.use("/employee" , empRoute);
app.use("/admin" , adminRoute);
app.use("/attendence" , attendenceRoute)
app.use("/detail" , detailRoute)




app.listen(process.env.PORT , ()=>{
    console.log("listning on port " + process.env.PORT)
})