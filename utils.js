const jwt = require('jsonwebtoken')

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

function createAccessToken(payload) {
    //create the access token with the shorter lifespan
    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });
    return accessToken;
};

function createRefreshToken(payload) {
    //create the refresh token with the longer lifespan
    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_LIFE,
    });
    return refreshToken;
};


module.exports = { getRandomInt, createAccessToken, createRefreshToken }