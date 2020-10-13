const mongoose = require('mongoose');
const MorningInputSeeder = require('./seeders/morningInput.seeder');

const mongoURL = 'mongodb://127.0.0.1:27017';


/**
 * Seeders List
 * order is important
 * @type {Object}
 */
module.exports.seedersList = {
  MorningInputSeeder,
};

/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
async function connect() {
  await mongoose.connect(mongoURL, {
    useNewUrlParser: true,
  });
}
module.exports.connect = connect;

/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
async function dropdb() {
  await mongoose.connection.db.dropDatabase();
}

module.exports.dropdb = dropdb;
