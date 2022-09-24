const express = require("express")
const app = express()
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const services = require("./services")
const env = require("./configs/config")
const cookieParser = require("cookie-parser")
//-------

const authRoute = require("./routes/auth")
const licenseRoute = require("./routes/license")
const execRoute = require("./routes/exec")
const userRoute = require("./routes/user")
const adminUserRoute = require("./routes/adminUser")
const adminLicenseRoute = require("./routes/adminLicense")
const resetPasswordRoute = require("./routes/password")

env.configenv
services()


//---------
app.use(cors({origin: true,credentials: true}))
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(morgan("dev"))


//---------
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/exec", execRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/license", licenseRoute)
app.use("/api/v1/admin/user", adminUserRoute)
app.use("/api/v1/admin/license", adminLicenseRoute)
app.use("/api/v1/reset_password", resetPasswordRoute)



app.listen(process.env.APP_PORT, () => {
  console.log("Server is running...");
})