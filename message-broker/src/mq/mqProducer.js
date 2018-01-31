"use strict";
var amqp = require('amqplib/callback_api');
const config = require('config');

exports.addMessage = (key, msg) => {
	let connStr = 'amqp://' + config.get('RabbitConfig.host') + ':' + config.get('RabbitConfig.port')
	console.log('connStr -> ' + connStr)
	return new Promise((resolve, reject) => {
		amqp.connect(connStr, (err, conn) => {
			if(err) {				
				console.error(err);
				reject({
					error : err
				})
			}
			conn.createChannel((err, ch) => {
				if(err) {
					console.error(err);
					reject({
						error : err
					})
				}
				var ex = 'topic_' + key;
				console.log(ex);
				ch.assertExchange(ex, 'topic', {durable: false});
				ch.publish(ex, key, new Buffer(JSON.stringify(msg)));
				resolve({
					message : 'Queued | { topic : ' + ex + ', message : ' + new Buffer(JSON.stringify(msg)) + ' }'
				})
			});
			setTimeout(function() { conn.close(); }, 500);
		});
	});    
}
