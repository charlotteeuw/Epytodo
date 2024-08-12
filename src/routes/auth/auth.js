const express = require('express');
const router = express.Router();
const user_queries = require("../user/user.query.js");
const bcrypt = require('bcryptjs');
const db = require('../../config/db');
const jwt = require('jsonwebtoken');

router.post('/register', (request, res) => {
  let firstname = request.body.firstname;
  let lastname = request.body.lastname;
  let email = request.body.email;
  let password = request.body.password;
  if (!firstname || !lastname || !email || !password) {
    res.status(400).json({"msg":"Bad parameter"});
    return;
  }
  db.execute('SELECT email FROM `user` WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({"msg": "Internal server error"});
      return;
    }
    if (result.length > 0) {
      console.error('Email:', result);
      res.status(409).json({"msg":"Account already exists"});
      return;
    } else {
      const hashed_pwd = bcrypt.hashSync(password, 10);
      db.execute('INSERT INTO `user` (email, password, name, firstname) VALUES (?, ?, ?, ?)', [email, hashed_pwd, lastname, firstname], (err, result) => {
        const token = jwt.sign({email:email, password:hashed_pwd}, process.env.SECRET, {expiresIn: "24h"});
        res.status(200).send({token});
    });
    }
  });
});

router.post('/login', (request, res) => {
  let email = request.body.email;
  let password = request.body.password;
  if (!email || !password) {
    res.status(400).json({"msg":"Bad parameter"});
    return;
  }
  db.execute('SELECT email FROM `user` WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({"msg": "Internal server error"});
      return;
    }
    if (result.length > 0) {
      db.execute('SELECT id, password FROM `user` WHERE email = ?', [email], (err, result) => {
        bcrypt.compare(password, result[0].password, function(err, results) {
            if (results == false) {
                res.status(401).json({"msg":"Invalid Credentials"});
            } else {
                const token = jwt.sign({email:email, password:password, id:result[0].id}, process.env.SECRET, {expiresIn: "24h"});
                res.status(200).send({token});
            }
        });
    });
    } else {
      res.status(401).json({"msg":"Not found"});
      return;
    }
  });
});

module.exports = router;
