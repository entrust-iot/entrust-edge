'use strict';

function mqtt() {
  var self = this;

  const mqtt = require('mqtt'),
        fs = require('fs'),
	Q = require('q');

  const LOCALHOST = '127.0.0.1';
  const SEC_DIR = 'security';
  const SECURE_CERT = SEC_DIR + '/client.crt';
  const SECURE_KEY = SEC_DIR + '/client.key';
  const SECURE_CA = SEC_DIR + '/ca.crt';

  var client = undefined;
  var edgeId = undefined;;
  var initRequest = undefined;
  var initResponse = undefined;

  self.init = init;
  self.sendAgent = sendAgent;
  self.sendService = sendService;

  function init(id, initReq, initRes) {
    connect();

    edgeId = id;
    initRequest = initReq;
    initResponse = initRes;
  }

  function sendAgent(id, msg) {
    send(getAgentTopic(id), msg);
  }

  function sendService(msg) {
    send('service/init', msg);
  }

  function send(id, msg) {
    if (client) {
      client.publish(id, JSON.stringify(msg));
    }
  }

  function connect() {
    readSecureFiles().then(function(options) {
      client = mqtt.connect('mqtts://' + LOCALHOST, options);
      client.on('connect', connectHandler);
      client.on('close', closeHandler);
      client.on("message", handleMessage);
    }).done();
  }

  function readSecureFiles() {
    return Q.all([SECURE_CERT, SECURE_KEY, SECURE_CA]
      .map(function(path) {
        return Q.nfcall(fs.readFile, path);
      }))
    .spread(function (cert, key, ca) {
      return {
        cert: cert,
        key: key,
        ca: ca
      };
    });
  };

  function connectHandler() {
    console.log('connected to *local* mqtt');
    client.subscribe(['init', 
                      'edge/'+edgeId]);
  }

  function closeHandler() {
    client.removeListener('connect', connectHandler);
    client.removeListener('close', closeHandler);
    client.removeListener("message", handleMessage);

    client = undefined;
    connect();
  }


  function handleMessage(topic, message, packet) {
    console.log("Received '" + message + "' on '" + topic + "'");

    var obj = JSON.parse(message);

    if (topic.indexOf('edge') === 0) {
      if (initResponse) {
        initResponse(obj);
      } 
    } else {
      if (initRequest) {
        initRequest(obj);
      }
    }
  }

  function getAgentTopic(key) {
    return 'agents/' + key;
  }
}

module.exports = exports = new mqtt();
