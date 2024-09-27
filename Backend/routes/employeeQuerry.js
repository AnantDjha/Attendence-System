const express = require("express");
const { addQuerry, getQuerry, acceptLeaveChange, reject, accecptLeaveApplication } = require("../controllers/employeeQuerry");

const router = express.Router();

router.post("/add" , addQuerry);
router.post("/acceptLeaveChange" , acceptLeaveChange)
router.get("/" , getQuerry);
router.post("/reject" , reject);
router.post("/acceptApplication" , accecptLeaveApplication)

module.exports = router;