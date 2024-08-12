const db = require("../config/db");

module.exports = (request, res, next) => {
    try {
        const id = request.params.id;
        db.execute('SELECT * FROM todo WHERE id = ?', [id], (err, result) => {
            if (err) {
                res.status(500).json({"msg": "Internal server error" });
                return;
            }
            if (result.length > 0) {
                next();
            } else {
                res.status(404).json({"msg": "Route not found" });
            }
        });
    } catch(error) {
        res.status(500).json({"msg": "Internal server error" });
    }
};
