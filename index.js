const express = require('express');
const app = express();
const server = require('http').Server(app);

const mongoose = require('mongoose');
const assetModel = require('./Models/Asset');
const iconModel = require('./Models/Icons');
const routes = require('./routes');
const cors = require('cors');
const socket = require('./socket');
const RECALL_API =205 //min that the server will wait before to request information to the CoinAPI.io

mongoose.Promise = global.Promise;
/**
 * It will transform min to milliseconds
 * @returns number
 */
const millisecons = () => {
  let millisecons = RECALL_API * 60000;
  console.info(`Server will call API every ${millisecons} `);
  return millisecons
}

/**
 * It will generate the connection to MongoDB
 */
const connect = async () => {
  try {
    const connection = await mongoose
      .connect('mongodb://admin:p%40ssw0rd@localhost:27017/?authSource=admin', {
        useNewUrlParser: true,
      })
      .then((response) => get_assets())//calling asset information method
      .then(() => get_icons()); //calling icons information method
    if (connection) {
      console.log('\x1b[32m%s\x1b[0m', 'Database Connected Successfully...');//it will show when the connection is successful
    }
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', 'Error while connecting database\n');//In case of and connection error, it will show the message
    console.log(error);
  }
};

const port = 3001; // port configuration where the server will run the code
const api_key = 'CECE5A31-EE36-4DA4-A09E-71AF117B9785'; //API key to be able to receive information from CoinAPI.io
const URL = 'https://rest.coinapi.io/';//Domain to connect to CoinAPI.io

const assets = 'v1/assets/';//Path to request assets information to the API
const icons_exchanges = 'v1/exchanges/icons/sm'; //Path to get exchange icons information
const icons_assets = 'v1/assets/icons/sm'; // Path to get assets icons information

/**
 * Method will fetch the assets information using the domain and assets path
 */
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
        const asset_model = new assetModel(asset); //Creating Asset model base in the information requested
        assetModel
          .findOneAndUpdate({ asset_id: asset_model.asset_id }) // in case the record exist in the DB, it will get updated, otherwise it get will created
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
    .then(() => setTimeout(()=>get_assets(), millisecons()));//it will call the method again after the min configure before.
};
/**
 * Method will fetch all the icons related to exchange and assets from CoinAPI.io
 */
const get_icons = () => {
  fetch(URL + icons_exchanges, {
    method: 'GET',
    headers: {
      'X-CoinAPI-Key': api_key,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log('icon 1', response)
      response.forEach((icon) => {
        const icon_model = new iconModel(icon); //Creating Icon model base in the information requested
        iconModel
          .findOneAndUpdate({ asset_id: icon_model.asset_id })// in case the record exist in the DB, it will get updated, otherwise it will get created
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
      console.log('icon 2 ', response)
      response.forEach((icon) => {
        const icon_model = new iconModel(icon); //Creating Icon model base in the information requested
        iconModel
          .findOneAndUpdate({ asset_id: icon_model.asset_id }) // in case the record exist in the DB, it will get updated, otherwise it will get created
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
app.use(cors()); // CORS configuration to allow connection from the frontend
app.use(routes); // adding routes configuration to be able to make request to the local API
socket.connect(server);// creating connection to use websockets in the server
/**
 * Generating connection to the use side
 */
server.on('connection', (socket) => {
  console.log(`user connected:`);
});
/**
 * Turning the server on with the configured port from the beggining (3001)
 *
*/
server.listen(port, () => {
  connect();
});
