'use strict';

var mqtt = require('./mqtt'),
    guid = require('./guid'),
    edgeId = guid();

console.log('Entrust Edge Service starting...');

mqtt.init(edgeId, handleInitRequest, handleInitResponse);

function handleInitRequest(msg) {
  console.log(msg);
  msg.edgeId = edgeId;

  mqtt.sendService(msg);
}

function handleInitResponse(msg) {
  if (msg.agentId) {
    mqtt.sendAgent(msg.agentId, msg);
  }
}
