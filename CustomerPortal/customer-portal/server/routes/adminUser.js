const router = require("express").Router()
const adminUserController = require("../controllers/adminUserController")
const authenticateToken = require("../middlewares/authenticateToken")
const adminAuthorization = require("../middlewares/adminAuthorization")


router.get("/:id",adminAuthorization ,authenticateToken , adminUserController.getUser)
router.get("/",adminAuthorization ,authenticateToken , adminUserController.getAllUser)
router.post("/create",adminAuthorization ,authenticateToken, adminUserController.createUser)
router.put("/:id" ,adminAuthorization ,adminUserController.updateUser)
router.delete("/:id",adminAuthorization ,authenticateToken , adminUserController.deleteUser)




module.exports = router
