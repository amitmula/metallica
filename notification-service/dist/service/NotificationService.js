'use strict';

const socketio = require('socket.io');
const consumer = require('../mq/mqConsumer');

const { io, server } = require('../index');

class NotificationService {
  constructor(io) {
    let args = ['#'];
    console.log('----> io ', io);
    consumer.startConsumers(args, 'marketData', io);
    consumer.startConsumers(args, 'trade', io);
    console.log('notification service constructor called..reading notifications from rabbitMq');
  }
}
module.exports = NotificationService;
//# sourceMappingURL=NotificationService.js.map