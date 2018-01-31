import { Router } from 'express';

const routes = Router();
const pjson = require('../../package.json');
const config = require('config')
/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'Notification Service', 'version': pjson.version});
});

routes.get(config.get('appConfig.healthCheckUrl'), function(req, res) {
  res.sendStatus(200);
});

export default routes;
