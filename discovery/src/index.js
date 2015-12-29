var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

var broadcastAddress = '255.255.255.255';
var broadcastPort = 5555;


var os = require('os');
var ifaces = os.networkInterfaces();
var addr = undefined;
var adapter = ifaces['eth0'];
console.log('Checking for eth0');

if(!adapter) {
  adapter = ifaces['Ethernet'];
  console.log('Checking for Ethernet');
}

if(!adapter) {
  adapter = ifaces['Wi-Fi'];
  console.log('Checking for Wi-Fi');
}

if(!adapter) {
  console.log('No interface found.');
  return;
}



adapter.forEach(function (iface) {
  if (addr) {
    return;
  }

  console.log(iface.family);
  if (iface.family !== 'IPv4') {
    console.log('Non IPv4 interface found.');
    return;
  }

  addr = iface.address;
});

// Broadcast wasn't working without the addr argument in the bind
socket.bind(broadcastPort, addr,  function() {
  socket.setBroadcast(true);
//  socket.setMulticastTTL(3);
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