const mongoose = require('mongoose');


const Schema = mongoose.Schema;

/**
 * Crearting Schema for Icons structure.
 */
const iconSchema = new Schema({
  asset_id: String,
  url: String,
}
);

const icons_model = mongoose.model('Icons', iconSchema); //Creating model for Icons Document
module.exports = icons_model;
