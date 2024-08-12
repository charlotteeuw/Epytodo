const db = require('../../config/db');

function create_list(res, title, description, created_at, due_time, user_id, status) {
    db.execute('INSERT INTO `todo` (title, description, created_at, due_time, user_id, status) VALUES (?, ?, ?, ?, ?, ?)', [title, description, created_at, due_time, user_id, status], (err, result) => {
        if (err) {
            res.status(500).json({"msg":"Internal server error"});
        } else {
            res.status(200).json(result.insertId);
        }
    });
}

function update_list(res, id, title, description, due_time, user_id, status) {
    db.execute('UPDATE `todo` SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?', [title, description, due_time, user_id, status, id], (err, result) => {
        if (err) {
            res.status(500).json({"msg":"Internal server error"});
        } else {
            db.execute('SELECT title, description, due_time, user_id, status FROM `todo`', [title, description, due_time, user_id, status], (err, results) => {
                res.status(200).json(results);
            });
        }
    });
}

function show_list(res) {
    db.execute('SELECT id, title, description, created_at, due_time, user_id, status FROM `todo`', (err, result) => {
        if (err) {
            res.status(500).json({"msg":"Internal server error"});
        } else {
            res.status(200).json(result);
        }
    });
}

function show_list_by_id(res, id) {
    db.execute('SELECT * FROM `todo` WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({"msg":"Internal server error"});
        } else {
            res.status(200).json(result);
        }
    });
}

function delete_list(res, id) {
    db.execute('DELETE FROM `todo` WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({"msg":"Internal server error"});
        } else {
            res.status(200).json({"msg":"Successfully deleted record number: ${id}"});
        }
    });
}

module.exports = {
    create_list,
    update_list,
    show_list,
    show_list_by_id,
    delete_list
};
