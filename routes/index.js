const express = require('express');
const asset_model = require('../Models/Asset');
const historyModel = require('../Models/History');
const bodyParser = require('body-parser');
const routes = express.Router();
let jsonParser = bodyParser.json();

// Assets
routes.route('/assets').get(function (req, res) {
  asset_model.find().then((response) => res.json(response));
});

// History
routes.route('/history').get((req, res) => {
  console.log('history route');
  historyModel.find().then((response) => res.json(response));
})
.post(jsonParser,(req, res) => {
  const bodyRequest = req.body
  bodyRequest['date_time'] = new Date();
  const historObj = new historyModel(bodyRequest)
  historObj.save();
  console.log(historObj)
  res.sendStatus(200)
});
module.exports = routes;
