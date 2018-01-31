import app from './app/app';
const Eureka = require('eureka-js-client').Eureka;
const config = require('config');
const socketio = require('socket.io');
const NotificationService = require('./service/NotificationService');

const { appPort = config.get('appConfig.port') } = process.env;
const client = new Eureka({
  instance: {
    app: config.get('appConfig.appId'),
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      '$': appPort,
      '@enabled': 'true',
    },
    vipAddress: config.get('appConfig.appId'),
    statusPageUrl: 'http://localhost:' + appPort + config.get('appConfig.healthCheckUrl'),
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: config.get('eurekaConfig.host'),
    port: config.get('eurekaConfig.port'),
    servicePath: config.get('eurekaConfig.servicePath'),
    fetchRegistry: config.get('eurekaConfig.fetchRegistry'),
    registerWithEureka: config.get('eurekaConfig.registerWithEureka'),
    maxRetries: config.get('eurekaConfig.maxRetries')
  },
});
let server = app.listen(appPort, () => {
  console.log('Listening on port ', appPort)
  require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    if (err) throw err;
    var healthCheckUrl = 'http://' + add + ':' + appPort + config.get('appConfig.healthCheckUrl');
    console.log('healthCheckUrl -->', healthCheckUrl)
    client.logger.level('debug');
    client.start(function (error) {
      console.log(JSON.stringify(error) || 'Eureka registration complete');
    });
  });
});

const io = socketio(server);

const TRADE_MODIFIED = {
	channel: 'trade data modified'
};

const MARKET_DATA_MODIFIED = {
	channel: 'market data modified'
};

const NOTIFICATION_TYPE = {
  marketDataModified: MARKET_DATA_MODIFIED,
  tradeDataModified: TRADE_MODIFIED
};


io.on('connect', function (clientConnection) {
  console.log('-----> new socket connection with client id', clientConnection.id);
  console.log('-----> new socket connection with client headers', clientConnection.handshake.headers);
  console.log('-----> connection upgraded from polling?', clientConnection.conn.upgraded);
  console.log('-----> connection upgrading from polling?', clientConnection.conn.upgrading);

  clientConnection.on('join channel', function (channelName, callback) {
    clientConnection.join(NOTIFICATION_TYPE[channelName].channel, callback("joined " + channelName));
    console.log('client', clientConnection.id, 'joined socket channel', NOTIFICATION_TYPE[channelName].channel);
  });

});

io.on('disconnect', function () {
  console.log('connection disconnected.');
});
const notificationService = new NotificationService(io);
module.exports = { io, server };
