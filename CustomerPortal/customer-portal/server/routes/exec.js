const router = require("express").Router()
const commandController = require("../controllers/commandContoller")
const authenticateToken = require("../middlewares/authenticateToken")




router.get("/license/:id", authenticateToken ,commandController.runLicenseExec)
router.get("/software/:id", authenticateToken ,commandController.runSoftwareExec)
router.get("/database/:id", authenticateToken ,commandController.runDatabaseExec)




module.exports = router
