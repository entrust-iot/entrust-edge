var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

var testMessage = "[hello world] pid: " + process.pid;
var broadcastAddress = '255.255.255.255';
var broadcastPort = 5555;


var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});

socket.bind(broadcastPort, function() {
  socket.setBroadcast(true);
});

socket.on("message", function ( data, rinfo ) {
	console.log("Message received from ", rinfo.address, " : ", data.toString());
});

setInterval(function () {
	socket.send(new Buffer(testMessage), 
			0, 
			testMessage.length, 
			broadcastPort, 
			broadcastAddress, 
			function (err) {
				if (err) console.log(err);
				
				console.log("Message sent");
			}
	);
}, 1000);
