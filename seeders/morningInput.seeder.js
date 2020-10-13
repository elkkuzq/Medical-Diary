const Seeder = require('mongoose-data-seed').Seeder;
const DiaryMorningInput = require('../models/diaryMorningInput');
const { getRandomInt } = require('../utils');

const data = createData(100);

function createData(n) {
    var data = []
    for (var i = 0; i < n; i+=1) {
        input = {
            date: new Date(),
            sleepDuration: getRandomInt(24),
            sleepQuality: getRandomInt(100),
            overallFeeling: getRandomInt(100),
            sick: Math.random() >= 0.5,
            strangeSyndrome: Math.random() >= 0.5,
            stressLevel: getRandomInt(100),
            notes: " ",
        };
        data.push(input)
    }
    return data;
}

class MorningInputSeeder extends Seeder {
  // eslint-disable-next-line class-methods-use-this
  async shouldRun() {
    return DiaryMorningInput.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  // eslint-disable-next-line class-methods-use-this
  async run() {
    return DiaryMorningInput.create(data);
  }
}

module.exports = MorningInputSeeder;
