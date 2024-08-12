const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const user_queries = require('./user.query.js');
const todo_queries = require('../todos/todos.query.js');
const bcrypt = require('bcryptjs');

router.get('/user', auth, (request, res) => {
    user_queries.show_user(res)
});

router.get('/user/todos', auth, (request, res) => {
    todo_queries.show_list(res)
});

router.get('/users/:id', auth, (request, res) => {
    const id = request.params.id;
    user_queries.show_user_by_id(res, id)
});

router.get('/users/:email', auth, (request, res) => {
    const email = request.params.email;
    user_queries.show_user_by_email(res, email)
});

router.put('/users/:id', auth, (request, res) => {
    const email = request.body.email;
    const password = request.body.password;
    const firstname = request.body.firstname;
    const name = request.body.name;
    const id = request.params.id;

    if (!email || !password || !firstname || !name) {
        res.status(400).json({"msg":"Bad parameter"});
        return;
    }
    const hashed_pwd = bcrypt.hashSync(password, 10);
    user_queries.update_user(res, email, hashed_pwd, firstname, name, id);
});

router.delete('/users/:id', auth, (request, res) => {
    const id = request.params.id;
    user_queries.delete_user(res, id);
});

module.exports = router;
