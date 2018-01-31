'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

const routes = (0, _express.Router)();
const BrokerService = require('../service/brokerService');
const pjson = require('../../package.json');
const config = require('config');

const brokerService = new BrokerService();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'Message Broker', 'version': pjson.version });
});

routes.get(config.get('appConfig.healthCheckUrl'), function (req, res) {
  res.sendStatus(200);
});

/**
 * Add message to trade exchange
 */
routes.post('/addToTradeQueue', (req, res) => {
  console.log('in /addToTradeQueue');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  brokerService.addToTradeQueue(req.body).then(response => {
    res.end(JSON.stringify(response));
  }).catch(err => {
    console.error(err);
    res.end(JSON.stringify(err));
  });
});

/**
 * Add message to market data exchange
 */
routes.post('/addToMarketDataQueue', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  brokerService.addToMarketDataQueue(req.body).then(response => {
    res.end(JSON.stringify(response));
  }).catch(err => {
    console.error(err);
    res.end(JSON.stringify(err));
  });
});

exports.default = routes;
//# sourceMappingURL=routes.js.map