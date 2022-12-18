const express = require('express');
const app = express();
const server = require('http').Server(app);

const mongoose = require('mongoose');
const assetModel = require('./Models/Asset');
const iconModel = require('./Models/Icons');
const routes = require('./routes');
const cors = require('cors');
const socket = require('./socket');
const RECALL_API = 205//min

mongoose.Promise = global.Promise;

const millisecons = () => {
  let millisecons = RECALL_API * 60000;
  console.info(`Server will call API every ${millisecons} `);
  return millisecons
}

const connect = async () => {
  try {
    const connection = await mongoose
      .connect('mongodb://admin:p%40ssw0rd@localhost:27017/?authSource=admin', {
        useNewUrlParser: true,
      })
      .then((response) => get_assets())
      .then(() => get_icons());
    if (connection) {
      console.log('\x1b[32m%s\x1b[0m', 'Database Connected Successfully...');
    }
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', 'Error while connecting database\n');
    console.log(error);
  }
};

const port = 3001;
const api_key = 'C4AACEBD-0DB0-48B4-8532-58D528F691B3';
const URL = 'https://rest.coinapi.io/';

const assets = 'v1/assets/';
const icons_exchanges = 'v1/exchanges/icons/sm';
const icons_assets = 'v1/assets/icons/sm';

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
      response.forEach((asset) => {
        const asset_model = new assetModel(asset);
        assetModel
          .findOneAndUpdate({ asset_id: asset_model.asset_id })
          .then((response) => {
            if (response === null) {
              asset_model.save(function (err, item) {
                if (err) return console.error(err);
                console.log(item + ' saved to bookstore collection.');
              });
            }
          });
      });
    })
    .then(() => setTimeout(()=>get_assets(), millisecons()));
};
const get_icons = () => {
  fetch(URL + icons_exchanges, {
    method: 'GET',
    headers: {
      'X-CoinAPI-Key': api_key,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      response.forEach((icon) => {
        const icon_model = new iconModel(icon);
        iconModel
          .findOneAndUpdate({ asset_id: icon_model.asset_id })
          .then((response) => {
            if (response === null) {
              icon_model.save((err, item) => {
                if (err) console.log(err);
              });
            }
          });
      });
    })
  fetch(URL + icons_assets, {
    method: 'GET',
    headers: {
      'X-CoinAPI-Key': api_key,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      response.forEach((icon) => {
        const icon_model = new iconModel(icon);
        iconModel
          .findOneAndUpdate({ asset_id: icon_model.asset_id })
          .then((response) => {
            if (response === null) {
              icon_model.save((err, item) => {
                if (err) console.log(err);
              });
            }
          });
      });
    })
    .then(() => setTimeout(()=>get_icons(), millisecons()));
};
app.use(cors());
app.use(routes);
socket.connect(server);
server.on('connection', (socket) => {
  console.log(`user connected:`);
});
server.listen(port, () => {
  // console.log('starting from docker sdfsdf');
  connect();
});
