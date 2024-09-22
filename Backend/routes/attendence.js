const express = require("express");
const { getPresentEmp, getAbsentEmp, markAbsent, markLeave, markPresent, markAbsentForToday } = require("../controllers/attendence");
const router = express.Router()

router.post("/present" , getPresentEmp)
router.post("/absent", getAbsentEmp)
router.post("/mark-absent" , markAbsent)
router.post("/mark-leave" , markLeave)
router.post("/mark-present" , markPresent)
router.get("/mark-absent-today", markAbsentForToday)

module.exports = router;