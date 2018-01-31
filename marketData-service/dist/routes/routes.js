'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

const routes = (0, _express.Router)();
const MarketDataService = require('../service/MarketDataService');
const pjson = require('../../package.json');
const config = require('config');

const marketDataService = new MarketDataService();
/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'MarketData Service', 'version': pjson.version });
});

routes.get(config.get('appConfig.healthCheckUrl'), function (req, res) {
  res.sendStatus(200);
});

/**
 * GET all commodity prices
 */
routes.get('/price/:id', (req, res) => {
  if (req.params.id) {
    marketDataService.getCommodityPrices(req.params.id).then(response => {
      res.end(JSON.stringify(response.message));
    }).catch(err => {
      console.error(err);
      if (err.error.endsWith('No records found')) res.status(404);
      res.end(JSON.stringify(err));
    });
  }
});

/**
 * Set commodity prices
 */
routes.post('/price/save', (req, res) => {
  marketDataService.setCommodityPrices(req.body).then(response => {
    res.end(JSON.stringify(response));
  }).catch(err => {
    console.error(err.stack);
    res.status(500).end({ success: false, error: JSON.stringify(err) });
  });
});

routes.post('/trade/save', (req, res) => {
  tradeService.save(req.body).then(response => {
    res.end(JSON.stringify(response));
  }).catch(err => {
    console.error(err);
    res.end(JSON.stringify(err));
  });
});

exports.default = routes;
//# sourceMappingURL=routes.js.map