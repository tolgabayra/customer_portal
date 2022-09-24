const env = require("../configs/config")
env.configenv

const adminAuthorization = (req, res, next) => {
    //const admin_token = req.headers.authorization.split(' ')[1]
    const admin_token = req.cookies.admin_token
    console.log(admin_token);
    if (admin_token === global.adminToken) {
        next();
     
    } else {
      res.status(403).json("Yetkisiz İşlem !!!");
    }
  };



module.exports  = adminAuthorization