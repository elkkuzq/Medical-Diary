const MorningInput = require('./models/diaryMorningInput');
const EveningInput = require('./models/diaryEveningInput');
const User = require('./models/user');
const moment = require('moment');
const { createAccessToken, createRefreshToken } = require('./utils');
const { verify } = require('./middleware/auth')
const jwt = require('jsonwebtoken')

var express = require('express');
var api = express.Router();


api.post('/login', async function(req, res) {
    let appleId = req.body.appleId;
    if (!appleId) {
        return res.status(400).json('Apple id not sent');
    }
    let user = await User.findOne({ appleId });
    if (user != null) {
        let accessToken = createAccessToken({ userId: user.id });
        let refreshToken = createRefreshToken({ userId: user.id });
        await user.set({
            ...user,
            refreshToken,
        }).save();
        return res.status(200).json({ jwt: accessToken })
    }
    let newUser = await new User({
        created: new Date(),
        appleId,
    }).save();
    let accessToken = createAccessToken({ userId: newUser.id });
    let refreshToken = createRefreshToken({ userId: newUser.id });
    await newUser.set({
        ...newUser,
        refreshToken,
    }).save();
    return res.status(200).json({ jwt: accessToken })

});

api.post('/refresh', async function(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(403).send();
    }

    const accessToken = authHeader.split(' ')[1];

    if (!accessToken){
        return res.status(403).send();
    }

    let payload;
    try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    }
    catch(error) {
        return res.status(403).send();
    }

    const user = await User.findById(payload.userId);
    let refreshToken = user.refreshToken;
    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    }
    catch(error) {
        return res.status(403).send()
    }

    let newToken = createAccessToken({ userId: user.id });
    
    return res.status(200).json({ jwt: newToken })

});

api.get('/morningInput', verify, async function(req, res) {
    const morningInputs = await MorningInput.find().sort({'date': 'asc'});
    return res.status(200).json(morningInputs);
});

api.get('/eveningInput', verify, async function(req, res) {
    const eveningInputs = await EveningInput.find().sort({'date': 'asc'});
    return res.status(200).json(eveningInputs);
});

api.get('/allInput', verify, async function(req, res) {
    const morningInputs = await MorningInput.find().sort({'date': 'asc'});
    const eveningInputs = await EveningInput.find().sort({'date': 'asc'});
    return res.status(200).json({morningInputs, eveningInputs});
});

api.get('/checkAvailability', verify, async function(req, res) {
    const today = moment().startOf('day')
    const date = {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate(),
    };
    const todaysMorningInput = await MorningInput.find({
        date,
    });
    const todaysEveningInput = await EveningInput.find({
        date,
    });
    return res.status(200).json({
        "morning": todaysMorningInput.length == 0,
        "evening": todaysEveningInput.length == 0,
    });
});

api.post('/morningInput', verify, async function(req, res) {
    await new MorningInput({
        date: new Date(),
        ...req.body,
    }).save();
    return res.status(200).json("Sucessfully added morning input");
});

api.post('/eveningInput', verify, async function(req, res) {
    await new EveningInput({
        date: new Date(),
        ...req.body,
    }).save();
    return res.status(200).json("Sucessfully added evening input");
});

module.exports = api;