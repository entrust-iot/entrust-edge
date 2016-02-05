'use strict';

function mqtt() {
  var self = this,
      mqtt = require('mqtt');

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
    client = mqtt.createClient(1883, '127.0.0.1', {
      username: "",
      password: ""
    });

    client.on('connect', connectHandler); 
    client.on('close', closeHandler);
    client.on("message", handleMessage);
  }

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
