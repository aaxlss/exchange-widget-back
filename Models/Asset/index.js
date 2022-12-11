const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const assetSquema = new Schema({
  asset_id: String,
  name: String,
  type_is_crypto: Boolean,
  data_quote_start: Date,
  data_quote_end: Date,
  data_orderbook_start: Date,
  data_orderbook_end: Date,
  data_trade_start: Date,
  data_trade_end: Date,
  data_symbols_count: Number,
  volume_1hrs_usd: Number,
  volume_1day_usd: Number,
  volume_1mth_usd: Number,
  price_usd: Number,
  id_icon: String,
  data_start: Date,
  data_end: Date
}
);

const asset_model = mongoose.model('Assets', assetSquema);
module.exports = asset_model;
