const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  appleId: { type: String, unique: true, required: true },
  created: { type: Date },
  fullName: { type: String },
  email: { type: String },
  refreshToken: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
