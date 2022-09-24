const env = require("../configs/config")
env.configenv

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_USER_PASSWORD,
  port: process.env.DB_PORT
})


const connectDB = async () => {
    await pool.connect(function(err) {
        if (err) throw err;
        console.log("DB is connected...");

      });
}


module.exports = {pool , connectDB};