const jwt = require("jsonwebtoken")
const pool = require("../services/db").pool;
const CryptoJS = require("crypto-js");
const env = require("../configs/config")
env.configenv

const login = async (req,res) => {

   const email = req.body.email
   const password = req.body.password
   //const password = CryptoJS.AES.decrypt(req.body.password, "MYSECRETKEY").toString(CryptoJS.enc.Utf8)
   

 

   const text = `SELECT * FROM tb_kullanicilar WHERE email = $1 and password = CRYPT($2, password)`
    try {
    
       const user = await pool.query(text, [email,password])
       userdata = user.rows[0]
       console.log(user);
       console.log(userdata);
   
          if (userdata !== undefined && userdata !== null) {
            const payload = {
                id: userdata.id,
                email: userdata.email
               }
            const accessToken = jwt.sign({ payload},"mySecretKey",{expiresIn: `${process.env.JWT_EXPIRES_TIME}`})
            const refreshToken = jwt.sign({ payload},"mySecretKey")

            res.cookie('access_token', accessToken, {
                origin: '*',
                httpOnly: true,
                //secure: true,
                //sameSite: true 

                /*
                Same Site - prevents the cookie from being sent in cross-site requests
                HTTP Only - cookies are only accessible from a server
                Secure - cookie must be transmitted over HTTPS

                */
            })
            res.cookie('refresh_token', refreshToken,{
                origin : '*',
                httpOnly: true,
                //secure: true,
                //sameSite: true
            })
            .status(200).json({
                userdata,
                accessToken,
                refreshToken
                
            })
            
        //     status(200).json({
        //     userdata,
        //     accesToken,
        //     refreshToken
        //    })
        } else {
            res.status(404).json("User not found !")
        }
       
    } catch (err) {
        res.status(500).json(err.stack)
    }
  }


  const adminLogin = (req,res) => {
    const email = req.body.email
    const password = req.body.password
    const t = Date.now()
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

        global.adminToken = CryptoJS.HmacSHA256(process.env.ADMIN_TOKEN, t.toString()).toString()
        res.cookie('admin_token',global.adminToken,{
            origin: '*',
            httpOnly: true
        })
        res.status(200).json({
            adminToken
        })
    }else{
        res.status(403).json("Email veya Parolaniz Yanlistir!!!")
    }
  }

















  const refreshToken = (req,res) => {
    const { email, refresh_token } = req.cookies
    const isValid = (email, refresh_token)

    if(!isValid){
        return res.status(401).json({ success: false, error: "Invalid token,try login again" })
    }

    const accessToken = jwt.sign({email: email},"mySecretKey",{
        expiresIn: "1h"
    })
    return res.status(200).json({success: true, accessToken })
  }




  const logout = (req, res) => {
        res.clearCookie('access_token');
        res.status(200).json('Logout success')
  }




module.exports = {
    login,
    logout,
    refreshToken,
    adminLogin
}