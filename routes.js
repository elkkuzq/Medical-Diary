const MorningInput = require('./models/diaryMorningInput');
const EveningInput = require('./models/diaryEveningInput');
const moment = require('moment');

var express = require('express');
var api = express.Router();

api.get('/morningInput', async function(req, res) {
    const morningInputs = await MorningInput.find().sort({'date': 'asc'});
    return res.status(200).json(morningInputs);
});

api.get('/eveningInput', async function(req, res) {
    const eveningInputs = await EveningInput.find().sort({'date': 'asc'});
    return res.status(200).json(eveningInputs);
});

api.get('/allInput', async function(req, res) {
    const morningInputs = await MorningInput.find().sort({'date': 'asc'});
    const eveningInputs = await EveningInput.find().sort({'date': 'asc'});
    return res.status(200).json({morningInputs, eveningInputs});
});

api.get('/checkAvailability', async function(req, res) {
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

api.get('/eveningInput/check', async function(req, res) {
    const today = moment().startOf('day')
    const todaysInput = await EveningInput.find({
        date: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate(),
        }
    });
    return res.status(200).json(todaysInput.length == 0);
});

api.post('/morningInput', async function(req, res) {
    await new MorningInput({
        date: new Date(),
        ...req.body,
    }).save();
    return res.status(200).json("Sucessfully added morning input");
});

api.post('/eveningInput', async function(req, res) {
    await new EveningInput({
        date: new Date(),
        ...req.body,
    }).save();
    return res.status(200).json("Sucessfully added evening input");
});

module.exports = api;