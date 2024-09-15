const express = require("express")
const { login, getAdmin, logout } = require("../controllers/admin")

const router = express.Router()

router.get("/" , getAdmin)
router.post("/login",login)
router.get("/logout" , logout)

module.exports = router