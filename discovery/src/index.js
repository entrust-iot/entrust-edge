var dgram = require('dgram');
var networkInterfaceName = 'eth0';
var socket = dgram.createSocket('udp4');

var broadcastAddress = '255.255.255.255';
var broadcastPort = 5555;


var os = require('os');
var ifaces = os.networkInterfaces();
var addr = undefined;

ifaces[networkInterfaceName].forEach(function (iface) {
  if (addr) {
    return;
  }

  if (iface.family !== 'IPv4') {
    return;
  }

  addr = iface.address;
});

socket.bind(broadcastPort, function() {
  socket.setBroadcast(true);
});

setInterval(function () {
	socket.send(new Buffer(addr), 
			0, 
			addr.length, 
			broadcastPort, 
			broadcastAddress, 
			function (err) {
				if (err) console.log(err);
			}
	);
}, 1000);

console.log('broadcast server started with addr:', addr);
