const router = require("express").Router()
const userController = require("../controllers/userController")
const authenticateToken = require("../middlewares/authenticateToken")


router.post("/resetpassword/:id", authenticateToken , userController.changePassword)




module.exports = router
