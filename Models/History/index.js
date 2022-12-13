const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const historySchema = new Schema({

  date_time: Date,
  currency_from: String,
  amount_1: Number,
  currency_to: String,
  amount_2: Number,
  type: String,
});

const history_model = mongoose.model('History', historySchema);
module.exports = history_model;
