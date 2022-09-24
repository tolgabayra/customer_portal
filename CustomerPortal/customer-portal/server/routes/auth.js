const router = require("express").Router()
const authController = require("../controllers/authController")
const refreshAuthenticateToken = require("../middlewares/refreshAuthenticateToken")




router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.post("/admin_login", authController.adminLogin)
router.post("/refreshtoken",refreshAuthenticateToken, authController.refreshToken)



module.exports = router
