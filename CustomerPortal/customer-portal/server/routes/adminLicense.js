const router = require("express").Router()
const adminLicenseController = require("../controllers/adminLicenseController")
const authenticateToken = require("../middlewares/authenticateToken")
const adminAuthorization = require("../middlewares/adminAuthorization")

router.get("/",adminAuthorization , adminLicenseController.getAllLicenses)
router.get("/used", adminAuthorization,authenticateToken , adminLicenseController.getUsedLicenses)
router.put("/:id",adminAuthorization ,adminLicenseController.updateLicense)
router.post("/assignment",adminAuthorization ,authenticateToken, adminLicenseController.licenseAssignment)



module.exports = router
