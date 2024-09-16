const express = require("express");
const { login, getEmployee, logout } = require("../controllers/empLogin");
const router = express.Router()

router.post("/login" , login);
router.get("/" , getEmployee);
router.get("/logout" , logout);

module.exports = router