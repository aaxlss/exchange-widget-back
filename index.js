const express = require('express');
const mongoose = require('mongoose');
const assetModel = require('./Models/Asset');
const routes = require('./routes');

mongoose.Promise = global.Promise;

const connect = async () => {
  try {
    const connection = await mongoose
      .connect('mongodb://admin:p%40ssw0rd@localhost:27017/?authSource=admin', {
        useNewUrlParser: true,
      })
      // .then((response) => get_assets());
    if (connection) {
      console.log('\x1b[32m%s\x1b[0m', 'Database Connected Successfully...');
    }
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', 'Error while connecting database\n');
    console.log(error);
  }
};

const app = express();
const port = 3000;
const api_key = 'C4AACEBD-0DB0-48B4-8532-58D528F691B3';
const URL = 'https://rest.coinapi.io/';

const assets = 'v1/assets/';

const get_assets = () => {
  fetch(URL + assets, {
    method: 'GET',
    headers: {
      'X-CoinAPI-Key': api_key,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      const asset_model = new assetModel();
      asset_model.collection.insertMany(response)
      .then(response => console.log(response))
      .catch(err => console.log(err));
      asset_model.save();
      // response.forEach((asset) => {
      //   const asset_model = new assetModel(asset);
      //   asset_model.save(function (err, item) {
      //     if (err) return console.error(err);
      //     // console.log(item + ' saved to bookstore collection.');
      //   });
      // });
    });
};

app.use(routes)
app.use(express.json());
app.listen(port, () => {
  // console.log('starting from docker sdfsdf');
  connect();
});
