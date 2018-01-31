'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

const routes = (0, _express.Router)();
const pjson = require('../../package.json');
const config = require('config');
/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'Notification Service', 'version': pjson.version });
});

routes.get(config.get('appConfig.healthCheckUrl'), function (req, res) {
  res.sendStatus(200);
});

exports.default = routes;
//# sourceMappingURL=routes.js.map