var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
var broadcastPort = 5555;

socket.bind(broadcastPort, function() {
  socket.setBroadcast(true);
});

socket.on("message", function ( data, rinfo ) {
	console.log("Message received from ", rinfo.address, " : ", data.toString());
});
