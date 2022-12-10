const express = require('express')
const asset_model = require('../../model')

const routes = express.Router();

routes.route('/assets').get(async function (req, res) {

  const assets = asset_model.find()
  .then(response => res.json(response));
});

module.exports = routes

