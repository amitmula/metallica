"use strict";

const mongodb = require('mongodb');
const config = require('config');

class mongoDB {
	constructor() {
		this.mongoClient = mongodb.MongoClient;
		this.ObjectID = mongodb.ObjectID;
		this.mongoURL = 'mongodb://' + config.get('mongoConfig.host') + ':' + config.get('mongoConfig.port') + '/' + config.get('mongoConfig.dbName');
	}

	onConnect(callback) {
		console.log("connecting to mongo...");
		this.mongoClient.connect(this.mongoURL, (err, db) => {
			if (err) callback(err);else callback(null, db, this.ObjectID);
		});
	}
}

module.exports = new mongoDB();
//# sourceMappingURL=mongoDB.js.map