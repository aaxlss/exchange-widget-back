const socketIO = require('socket.io');
const socket = {};

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
