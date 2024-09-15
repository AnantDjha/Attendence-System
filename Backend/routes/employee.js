const express = require("express");
const { fetchDetail, markAttendence } = require("../controllers/employee");
const router = express.Router();

router.post("/fetch-details" , fetchDetail );
router.post("/mark-attendence" ,  markAttendence);

module.exports = router;