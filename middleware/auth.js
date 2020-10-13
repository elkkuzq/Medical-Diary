const jwt = require('jsonwebtoken')

exports.verify = function(req, res, next){
    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(403).send();
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
        return res.status(403).send();
    }

    let payload
    try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.userId = payload.userId;
        next()
    }
    catch (e) {
        return res.status(403).send();
    }
}