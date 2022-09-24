const jwt = require('jsonwebtoken');


const refreshAuthenticateToken = (req, res, next) => {
    const authHeader = req.cookies.refresh_token;
    console.log(authHeader);
    if (authHeader) {
      
      jwt.verify(authHeader, "mySecretKey", (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
  
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  };



module.exports  = refreshAuthenticateToken