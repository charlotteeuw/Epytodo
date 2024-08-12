const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

function show_user(res) {
    db.execute('SELECT * FROM `user`', (err, result) => {
        if (err) {
            res.status(500).json({"msg":"Internal server error"});
        } else {
            res.status(200).json(result);
        }
    });
}

function show_user_by_id(res, id) {
    db.execute('SELECT id, email, password, created_at, firstname, name FROM `user` WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({"msg":"Internal server error"});
        } else {
            res.status(200).json(result);
        }
    });
}

function show_user_by_email(res, email) {
    db.execute('SELECT * FROM `user` WHERE email = ?', [email], (err, result) => {
        if (err) {
            res.status(500).json({"msg":"Internal server error"});
        } else {
            res.status(200).json(result);
        }
    });
}

function update_user(res, email, password, firstname, name, id) {
    db.execute('UPDATE `user` SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?', [email, password, firstname, name, id], (err, result) => {
        if (err) {
            res.status(500).json({"msg":"Internal server error"});
        } else {
            db.execute('SELECT * FROM `user` WHERE id = ?', [id], (err, results) => {
                res.status(200).json(results);
            });
        }
    });
}

function delete_user(res, id) {
    db.execute('DELETE FROM `user` WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({"msg":"Internal server error"});
        } else {
            res.status(200).json({"msg":"Successfully deleted record number: ${id}"});
        }
    });
}

function already_exists(request, email) {
    db.execute('SELECT email FROM `user` WHERE email = ?', [email], (err, result) => {
        if (result.length > 0) {
            return 1;
        } else {
            return 0;
        }
    });
}

function register(res, firstname, lastname, email, password) {
    db.execute('INSERT INTO `user` (email, password, name, firstname) VALUES (?, ?, ?, ?)', [email, password, lastname, firstname], (err, result) => {
        const token = jwt.sign({email:email, password:password}, process.env.SECRET, {expiresIn: "24h"});
        res.status(200).send({token});
    });
}

function doesnt_exist(request, email) {
    const exists = already_exists(request, email);
    if (exists) {
        return 1;
    } else {
        return 0;
    }
}

function login(res, email, password) {
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
}

module.exports = {
    show_user, 
    show_user_by_id,
    show_user_by_email,
    update_user, 
    delete_user, 
    already_exists, 
    doesnt_exist, 
    register, 
    login
};
