var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');
const conn = require('../config/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get-mahasiswa', function (req, res) {
  const queryStr = 'SELECT * FROM mahasiswa WHERE deleted_at IS NULL';
  conn.query(queryStr, (err, results) => {
    if (err) {
      res.status(500).json({
        "success": false,
        "message": err.sqlMessage
      });
    } else {
      if (results.length === 0) { // Periksa apakah tidak ada data yang ditemukan
        res.status(404).json({
          "success": false,
          "message": "Data mahasiswa tidak ditemukan"
        });
      } else {
        res.status(200).json({
          "success": true,
          "message": "Sukses menampilkan data",
          "data": results
        });
      }
    }
  });
});

router.get('/get-mahasiswa/:id', function (req, res) {
  const id = req.params.id;
  const queryStr = 'SELECT * FROM mahasiswa WHERE id = ? AND deleted_at IS NULL';
  const values = [id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      res.status(500).json({
        "success": false,
        "message": err.sqlMessage
      });
    } else {
      if (results.length === 0) { // Periksa apakah tidak ada data yang ditemukan
        res.status(404).json({
          "success": false,
          "message": "Data mahasiswa dengan ID tersebut tidak ditemukan"
        });
      } else {
        res.status(200).json({
          "success": true,
          "message": "Sukses menampilkan data",
          "data": results
        });
      }
    }
  });
});

router.post('/store-mahasiswa', function (req, res) {
  const param = req.body;
  const name = param.name;
  const jurusan = param.jurusan;
  const queryStr = 'INSERT INTO mahasiswa (name, jurusan) VALUES (?, ?)';
  const values = [name, jurusan];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      res.status(500).json({
        "success": false,
        "message": err.sqlMessage
      });
    } else {
      res.status(200).json({
        "success": true,
        "message": "Sukses menyimpan data",
        "data": null
      });
    }
  });
});

router.put('/update-mahasiswa/:id', function (req, res) {
  const id = req.params.id;
  const { name, jurusan } = req.body;
  const queryStr = 'UPDATE mahasiswa SET name = ?, jurusan = ? WHERE id = ? AND deleted_at IS NULL';
  const values = [name, jurusan, id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      res.status(500).json({
        "success": false,
        "message": err.sqlMessage
      });
    } else {
      if (results.affectedRows === 0) { // Periksa apakah tidak ada data yang diubah
        res.status(404).json({
          "success": false,
          "message": "Data mahasiswa dengan ID tersebut tidak ditemukan"
        });
      } else {
        res.status(200).json({
          "success": true,
          "message": "Sukses mengubah data",
          "data": null
        });
      }
    }
  });
});

router.delete('/delete-mahasiswa/:id', function (req, res) {
  const id = req.params.id;
  const queryStr = 'UPDATE mahasiswa SET deleted_at = ? WHERE id = ?';
  const now = new Date();
  const values = [now, id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      res.status(500).json({
        "success": false,
        "message": err.sqlMessage
      });
    } else {
      if (results.affectedRows === 0) { // Periksa apakah tidak ada data yang dihapus
        res.status(404).json({
          "success": false,
          "message": "Data mahasiswa dengan ID tersebut tidak ditemukan"
        });
      } else {
        res.status(200).json({
          "success": true,
          "message": "Sukses menghapus data",
          "data": null
        });
      }
    }
  });
});

module.exports = router;
