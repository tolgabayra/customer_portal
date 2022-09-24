const router = require("express").Router()
const passwordResetController = require("../controllers/passwordResetContoller")



router.post("/", passwordResetController.sendPasswordLink)
router.get("/:token", passwordResetController.verifyPasswordLink)
router.post("/:token", passwordResetController.setNewPassword)




module.exports = router