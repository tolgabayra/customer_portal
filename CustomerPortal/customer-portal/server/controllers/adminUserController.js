const pool = require("../services/db").pool;
const CryptoJS = require("crypto-js");
const env = require("../configs/config")
env.configenv



const getUser = async (req,res) => {
  const id = req.params.id
  const text = 'SELECT * FROM tb_kullanicilar WHERE id = $1'
  try {
    const user = await pool.query(text, [id])
    res.status(200).json(user.rows)
  } catch (err) {
    res.status(500).json(err)
  }
}


const getAllUser = async (req,res) => {
  const text = `
        SELECT
        jsonb_agg(jsonb_build_object(
          'id',
          atu.lisans_id
        ))  AS klisanslar,
        at.*
      FROM
      public."tb_kullanicilar" AS at
      LEFT JOIN public."tb_kullanici_lisans_atama" AS atu
      ON
        at.id = atu.kullanici_id  
      GROUP BY
        at.id
        
  

;

  `
  try {
    const users = await pool.query(text)
    res.status(200).json(users.rows)
  } catch (err) {
    res.status(500).json(err)
  }
}


const createUser = async (req,res) => {
    const {email,password,ad,soyad,kurum} = req.body;

    const text = `INSERT INTO tb_kullanicilar(email,password,ad,soyad,kurum) VALUES($1,CRYPT($2, GEN_SALT('bf')), $3,$4,$5)`
  try {
    await pool.query("BEGIN")
    const newCustomer = await pool.query(text, [email,password,ad,soyad,kurum])
    await pool.query("COMMIT")
    res.status(201).json(newCustomer)
  } catch (err) {
    await pool.query("ROLLBACK")
    console.log(err);
    res.status(500).json(err)
  }
}



const deleteUser = async (req,res) => {
  const id = req.params.id
  const text = 'DELETE FROM tb_kullanicilar WHERE id = $1'
  try {
    // Transaction başlat
    await pool.query('BEGIN')
    const response = await pool.query(text, [id])

    res.status(200).json(response)
    await pool.query('COMMIT')

    // Commit
  } catch (err) {
    // Rollback
    await pool.query('ROLLBACK')
    console.log(err);
    res.status(500).json(err)
  }
}


const updateUser = async (req,res) => {
  const id = req.params.id
  const {email, password,ad,soyad,kurum} = req.body
  const text = 'UPDATE tb_kullanicilar SET email = $1, password = $2, ad = $3, soyad = $4, kurum = $5 WHERE id = $6' 
  try {
    await pool.query('BEGIN')
    const updatedUser = await pool.query(text , [email,password,ad,soyad,kurum,id])
    res.status(200).json(updatedUser)
    await pool.query('COMMIT')

  } catch (err) {
    await pool.query('ROLLBACK')

    console.log(err);
    res.status(500).json(err)
  }
}



module.exports = {
  getUser,
  getAllUser,
  createUser,
  deleteUser,
  updateUser
}