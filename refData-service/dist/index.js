'use strict';

var _app = require('./app/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Eureka = require('eureka-js-client').Eureka;
const config = require('config');
const appPort = process.env.PORT || config.get('appConfig.port');
const client = new Eureka({
  // application instance information 
  instance: {
    app: config.get('appConfig.appId'),
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      '$': appPort,
      '@enabled': 'true'
    },
    vipAddress: config.get('appConfig.appId'),
    statusPageUrl: 'http://localhost:' + appPort + config.get('appConfig.healthCheckUrl'),
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    }
  },
  eureka: {
    // eureka server host / port 
    host: config.get('eurekaConfig.host'),
    port: config.get('eurekaConfig.port'),
    servicePath: config.get('eurekaConfig.servicePath'),
    fetchRegistry: config.get('eurekaConfig.fetchRegistry'),
    registerWithEureka: config.get('eurekaConfig.registerWithEureka'),
    maxRetries: config.get('eurekaConfig.maxRetries')
  }
});
_app2.default.listen(appPort, () => {
  console.log('Listening on port ', appPort);
  require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    if (err) throw err;
    var healthCheckUrl = 'http://' + add + ':' + appPort + config.get('appConfig.healthCheckUrl');
    console.log('healthCheckUrl -->', healthCheckUrl);
    client.logger.level('debug');
    client.start(function (error) {
      console.log(JSON.stringify(error) || 'Eureka registration complete');
    });
  });
});
//# sourceMappingURL=index.js.map