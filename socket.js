const socketIO = require('socket.io');
const socket = {};

/**
 * Method will store the socker configuration to connect from client side
 * @param {*} server //server information
 */
const connect = (server) => {
  socket.io =  socketIO(server,{cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }})
}


module.exports = {
  connect,
  socket
}
