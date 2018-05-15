const amqp = require('amqplib/callback_api');
const config = require('config')
const TRADE_MODIFIED = {
	channel: 'trade data modified'
};

const MARKET_DATA_MODIFIED = {
	channel: 'market data modified'
};

exports.startConsumers = (args, topicKey, io) => {
  let connStr = 'amqp://' + config.get('RabbitConfig.host') + ':' + config.get('RabbitConfig.port')
	amqp.connect(connStr, (err, conn) => {
    conn.createChannel((err, ch) => {
        var ex = 'topic_' + topicKey;
				ch.assertExchange(ex, 'topic', {durable: false});
				ch.assertQueue('', {exclusive: true}, (err, q) => {
					console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q.queue);
					args.forEach(function(key) {
						ch.bindQueue(q.queue, ex, key);
					});
					ch.consume(q.queue, function(msg) {
            if(topicKey === 'trade')
              io.in(TRADE_MODIFIED.channel).emit(TRADE_MODIFIED.channel, msg.content.toString());
            else
              io.in(MARKET_DATA_MODIFIED.channel).emit(MARKET_DATA_MODIFIED.channel, msg.content.toString());
						console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
					}, {noAck: true});
				});
			});
	});
}
