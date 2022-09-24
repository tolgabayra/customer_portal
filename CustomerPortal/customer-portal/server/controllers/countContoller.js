const pool = require("../services/db").pool 



const totalLicensesNumber = async (req,res) => {
  const text = `SELECT COUNT(*) FROM tb_lisanslar`
  try {
    const totalLicenses = pool.query(text)
    res.status(200).json(totalLicenses.row[0])
  } catch (err) {
    res.status(500).json(err)
  }
}



const totalCustomerNumber = async (req,res) => {
    const text = `SELECT COUNT(*) FROM tb_kullanicilar`
    try {
      const totalLicenses = pool.query(text)
      res.status(200).json(totalLicenses.row[0])
    } catch (err) {
      res.status(500).json(err)
    }
  }
  





module.exports = {
    totalLicensesNumber,
    totalCustomerNumber
}