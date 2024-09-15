const express = require("express");
const { getPersonalDetail, getAttendenceDetail } = require("../controllers/detail");
const router = express.Router()

router.post("/personal" , getPersonalDetail)
router.post("/attendence" , getAttendenceDetail)

module.exports = router