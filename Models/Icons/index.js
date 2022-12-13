const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const iconSchema = new Schema({
  asset_id: String,
  url: String,
}
);

const icons_model = mongoose.model('Icons', iconSchema);
module.exports = icons_model;
