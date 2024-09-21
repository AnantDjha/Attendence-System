const express = require("express");
const { getPresentEmp, getAbsentEmp, markAbsent, markLeave, markPresent } = require("../controllers/attendence");
const router = express.Router()

router.post("/present" , getPresentEmp)
router.post("/absent", getAbsentEmp)
router.post("/mark-absent" , markAbsent)
router.post("/mark-leave" , markLeave)
router.post("/mark-present" , markPresent)

module.exports = router;