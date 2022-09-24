const pool = require("../services/db").pool 
const nodemailer = require("nodemailer")
const env = require("../configs/config")
env.configenv


let user_id = null

/* Password Sıfırlama Link Gönder   //todo Insert Into Token Üret !!!! */
const sendPasswordLink = async (req,res) => {
  const kullanici_email = req.body.email
  const text = `INSERT INTO tb_parola_sifirlama_token (token, kullanici_id, gecerliliktarih) values (encode(gen_random_uuid()::text::bytea, 'base64'), $1, now()) RETURNING *`
  const text2 = `SELECT * FROM tb_kullanicilar WHERE email = $1`

  try {
    const checkMail = await pool.query(text2, [kullanici_email])
    const user_id = checkMail.rows[0].id

    if (checkMail.rows != null) {
      const resetLink = await pool.query(text, [user_id])

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'easton.cormier@ethereal.email',
            pass: 'tSv6yBSnkEGSnFUTk3'
        }
    });

    let message= {
      from : "support@epati.com",
      to: kullanici_email,
      subject: 'Parola Sıfırlama Bağlantısı',
      text:'Parola Sıfırlama Bağlantınız',
      html:`
      <p>Parola Sıfırlama Bağlantınızın Süresi Yalnızca 15 Dakikadır</p> <br/>
      <a href="http://localhost:3000/reset_password/${resetLink.rows[0].token}"> Parola Sıfırlama Bağlantı Linki</a>
      `
  }
  
  transporter.sendMail(message, (err, info) => {
    if (err) {
        console.log('Error occurred. ' + err.message);
        return process.exit(1);
    }

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


    console.log(resetLink.rows);
    res.status(200).json({message: "Parola Sıfırlama Linkiniz Mail Adresinize Gönderilmiştir."})

});


       

    }
    else{
      res.status(403).json({message: "Email Adresiniz Bulunamadı..."})
    }
  
  } catch (err) {
    res.status(500).json(err)
  }


}



/* Password Sıfırlama Linkini Kontrol */
const verifyPasswordLink = async (req,res) => {
  const date = new Date()
  const formatDate = date.toUTCString()
  console.log(formatDate);
  const token = req.params.token
  const text = `SELECT * FROM tb_parola_sifirlama_token WHERE token = $1 `
  const text2 = `
  select 
    * ,
    $1 - gecerliliktarih > '15 min'::interval as sure_gecti_mi
    from
        tb_parola_sifirlama_token 
    where token = $2
  `
  try {
    const link = await pool.query(text2, [formatDate, token])
    const userId = await pool.query(text, [token])
    if(link.rows[0].sure_gecti_mi === false){
        user_id = userId.rows[0].kullanici_id
        res.status(200).json({message : "Link Geçerli, ŞİFRE SIFIRLAMA İŞLEMİNE DEVAM EDEBİLİRSİNİZ."})
    }else{
        res.status(410).json({message: "Link Geçersiz... Lütfen yeni link isteyiniz." })
    }
  } catch (err) {
    res.status(500).json(err)
  }


}



/* SELECT YAPTIĞIMIZ YERDE KULLANICI_ID DEĞİŞKENDE TUTUP ONUN ÜZERİNDEN AKSİYON AL !!!!!! */
/*

  Linki bu func da kontrol et

*/

/* Yeni Şifreyi Set Et */
const setNewPassword = async (req,res) => {
  const newPassword = req.body.newpassword 
  const token = req.params.token
   

  const text3 = `SELECT * FROM tb_parola_sifirlama_token WHERE token = $1 `


  const text =`
   SELECT 
    CRYPT(
    $1, 
    GEN_SALT('bf')
    )       
  `
  // JOİN YAPILACAK...
  const text2 = `
    UPDATE
      tb_kullanicilar
    SET 
      password = $1
    WHERE
      id = $2
  `
  try {
    const resultHashPassword = await pool.query(text, [newPassword])
    const hashPassword = resultHashPassword.rows[0].crypt

    const changePassword = await pool.query(text2, [hashPassword, user_id])

    console.log("Hashed::",hashPassword);
    console.log("Changed::", changePassword);
    console.log("KULLANICI ID:",user_id);
    if (hashPassword.rows === null) {
        res.status(400).json("İşleminiz Geçersiz !!!")
    }
    if (changePassword.rows != null) {
      res.status(200).json({message: "Şifreniz Başarıyla Değiştirilmiştir... Yeni şifreniz ile giriş yapabilirsiniz"})
    }else{
      res.status(400).json("İşlem Geçersiz !!!")
    }
  

  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }



  /*
  
  UPDATE tb_kullanicilar SET email = $1, password = $2, ad = $3, soyad = $4, kurum = $5 WHERE id = $6

  */
}






module.exports = {
    sendPasswordLink,
    verifyPasswordLink,
    setNewPassword
}