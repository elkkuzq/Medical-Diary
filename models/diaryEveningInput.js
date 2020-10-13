const mongoose = require('mongoose');

const { Schema } = mongoose;

const DiaryEvenigInputSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  date: { type: Date },
  trainingIntensity: { type: Number },
  workIntensity: { type: Number },
  overallFeeling: { type: Number },
  sick: { type: Boolean },
  strangeSyndrome: { type: Boolean },
  stressLevel: { type: Number },
  notes: { type: String },
  anxietyLevel: { type: Number },
});

module.exports = mongoose.model('DiaryEveningInput', DiaryEvenigInputSchema);
