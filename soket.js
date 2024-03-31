const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer();

const io = new Server(server);

module.exports = { io };
