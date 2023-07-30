require('dotenv').config();
const jwt = require('jsonwebtoken');

const authorizeToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token==null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,userId)=>{
        if(err) return res.sendStatus(403);
        req.userId = userId;
        next();
    });
}

module.exports = authorizeToken;