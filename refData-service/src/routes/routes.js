import { Router } from 'express';

const routes = Router();
const RefDataService = require('../service/RefDataService');
const pjson = require('../../package.json');
const config = require('config')

const refDataService = new RefDataService();
/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'RefData Service', 'version': pjson.version});
});

routes.get(config.get('appConfig.healthCheckUrl'), function(req, res) {
  res.sendStatus(200);
});

/**
 * GET reference entity by type
 */
routes.get('/ref/:type', (req, res) => {
  if(req.params.type) {
    refDataService.getEntitiesByType(req.params.type).then( response => {
      res.end(JSON.stringify(response.message))
    }).catch(err => {
      if(err.error) {
        if(err.error.endsWith('No records found'))
          res.status(404)
      }
      res.end(JSON.stringify(err));
    })
  } else {
    res.status(400).end('{"success" : false, error: "type should be provided"}')
  }
});

/**
 * GET reference entity by symbol name
 */
routes.get('/ref/:type/:symbol', (req, res) => {
  if(req.params.type) {
    refDataService.getEntityBySymbol(req.params.type, req.params.symbol).then( response => {    
      res.end(JSON.stringify(response.message))
    }).catch(err => {
      console.error(err)
      if(err.error.endsWith('No records found'))
        res.status(404)
      res.end(JSON.stringify(err));
    })
  } else {
    res.status(400).end('{"success" : false, error: "type should be provided"}')
  }
});

export default routes;
