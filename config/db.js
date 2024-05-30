const mySql = require ("mysql2")
const conn = mySql.createPool( {
    host: "localhost",
    user: "root",
    password: "",
    charset: "utf8mb4",
    database: "kuliah",
    timezone: '+00:00'
  })
  conn.getConnection((err) => {
    if (err) throw err
    console.log('Connected!')
  })
  
  module.exports = conn
  