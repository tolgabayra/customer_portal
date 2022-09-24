const { Pool } = require('pg')
const jwt = require("jsonwebtoken")
const pool = require("../services/db").pool 



const getLicense = async (req,res) => {
  const id = req.params.id

  //USER KONTROLÜ
  if(id){
    try{
      const license = await pool.query(
        `
        SELECT

          tl.id,
          tl.anahtar,
          tm.isim as model,
          tu.isim as urun,
          tl."sozlesmeBaslama",
          tl."sozlesmeBitis",
          coalesce(tj.host_id, 'Lisans kullanımda değil.') as host_id,
          tj.id as jeton_id
        FROM

          tb_lisanslar as tl
          left join tb_kullanici_lisans_atama as tkla
            on tl.id = tkla.lisans_id
          left join tb_jetonlar as tj
            on tl.id = tj.lisans_id
          left join tb_modeller as tm
              on tl.model_id = tm.id
          left join tb_urunler as tu
              on tm.urun_id = tu.id
        WHERE
          tkla.kullanici_id = $1
        `,
        [id]
        )
      res.status(200).json(license.rows)
    }catch(err){
      res.status(500).json(err)
    }

  }else{
    res.status(403).json("Yetkiniz yoktur...")
  }
 
}


const getAllLicenses = async (req,res) => {
  if(req.user.role === admin){
    try {
      const lisanslar = await pool.query('SELECT * FROM tb_lisansanslar ')
      if(lisanslar){
          res.status(200).json(lisanslar.rows)
      }
  } catch (err) {
      res.status(500).json(err)
  }
  }
  
}






const updateLicense = async (req,res) => {
  const id = parseInt(req.params.id)

  const {name, status} = req.body

  await pool.query(
    'UPDATE licenses SET name = $1, status = $3 WHERE id = $3', [name, status, id],(result, error) => {
      if(error){
        throw error
      }
      res.status(200).json(`License modified with id:${id}`)
 })
}


const deleteLicense = async (req,res) => {
  const id = req.params.id

  try {
      await pool.query('DELETE FROM licenses WHERE id = $1', [id])
      res.status(200).json("Lisans silme işlemi basarili")
  } catch (err) {
      res.status(500).json(err)
  }

}




module.exports = {
    getLicense,
    updateLicense,
    deleteLicense,
    getAllLicenses

}