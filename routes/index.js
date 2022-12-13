const express = require('express');
const asset_model = require('../Models/Asset');
const historyModel = require('../Models/History');
const iconModel = require('../Models/Icons')
const bodyParser = require('body-parser');
const socket = require('../socket').socket;
const routes = express.Router();
let jsonParser = bodyParser.json();

// Assets
routes.route('/assets').get(function (req, res) {
  asset_model.find(req.query).limit(50).then((response) => {
    res.json(response)});
});

//Assets icons
routes.route('/icons').get((req, res) => {
  iconModel.find()
  .then(response => {
    let newJSON = {}
    response.map(icon => {
      newJSON[icon.asset_id] = {
        _id: icon._id,
        url: icon.url,
        __v: icon.__v,
      }
    })
    res.json(newJSON)
  })
});

// History
routes.route('/history').get((req, res) => {
  historyModel.find().then((response) => res.json(response));
})
.post(jsonParser,(req, res) => {
  const bodyRequest = req.body
  const historObj = new historyModel(bodyRequest)
  historObj.save();
  socket.io.emit('exchange added', historObj)
  res.sendStatus(200)
});
module.exports = routes;

