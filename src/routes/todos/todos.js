const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const todo_queries = require('./todos.query.js');

router.get('/todos', auth, (request, res) => {
    todo_queries.show_list(res);
});

router.get('/todos/:id', auth, (request, res) => {
    const id = request.params.id;
    todo_queries.show_list_by_id(res, id);
});

router.post('/todos', auth, (request, res) => {
    const title = request.body.title;
    const description = request.body.description;
    const created_at = request.body.created_at;
    const due_time = request.body.due_time;
    const status = request.body.status;
    const user_id = request.body.user_id;
    if (!title || !description || !created_at || !due_time || !user_id || !status) {
        res.status(500).json({"msg":"Internal server error"});
        return;
    }
    todo_queries.create_list(res, title, description, created_at, due_time, user_id, status);
});

router.put('/todos/:id', auth, (request, res) => {
    const id = request.params.id;
    const title = request.body.title;
    const description = request.body.description;
    const due_time = request.body.due_time;
    const user_id = request.body.user_id;
    const status = request.body.status;
    if (!title || !description || !due_time || !user_id || !status) {
        res.status(500).json({"msg":"Internal server error"});
        return;
    }
    todo_queries.update_list(res, id, title, description, due_time, user_id, status);
});

router.delete('/todos/:id', auth, (request, res) => {
    const id = request.params.id;
    todo_queries.delete_list(res, id);
});

module.exports = router;
