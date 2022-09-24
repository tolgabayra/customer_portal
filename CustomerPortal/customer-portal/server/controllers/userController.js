const pool = require("../services/db").pool 



const changePassword = async (req,res) => {
  const id = req.params.id
  const {oldpassword, newpassword} = req.body  
  const text = `UPDATE tb_kullanicilar set password = CRYPT($1, GEN_SALT('bf')) WHERE id = $2`
  const text2 = `SELECT * FROM tb_kullanicilar WHERE id = $1 and password = CRYPT($2, password)  `

  try{
    const checkpassword = await pool.query(text2, [id, oldpassword])
    if(checkpassword.rows[0] != null){
      try {
          const user = await pool.query(text, [newpassword, id])
              console.log(user.rows);
              res.status(200).json({"message": "Şifreniz Başarıyla Değiştirilmiştir."})
          
        } catch (err) {
          console.log(err);
          res.status(500).json(err.stack)
        }
    }
    else{
      res.status(401).json("Eski Şifreniz Yanlıştır")
    }
  
  }
  catch{
    res.status(500).json("Error...")
  }
 

 
}




module.exports = {
    changePassword
}