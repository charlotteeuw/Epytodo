const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).send({msg:"No token, authorization denied"});
            return;
        }
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.id = decodedToken.id;
        next();
    } catch(error) {
        res.status(498).send({msg:"Token is not valid"});
    }
};

module.exports = auth;
