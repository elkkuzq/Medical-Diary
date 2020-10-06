const MorningInput = require('./models/diaryMorningInput');
const EveningInput = require('./models/diaryEveningInput');

var express = require('express');
var api = express.Router();

api.get('/morningInput', async function(req, res) {
    const morningInputs = await MorningInput.find().sort({'date': 'desc'});
    return res.status(200).json(morningInputs);
});

api.get('/eveningInput', async function(req, res) {
    const eveningInputs = await EveningInput.find().sort({'date': 'desc'});
    return res.status(200).json(eveningInputs);
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