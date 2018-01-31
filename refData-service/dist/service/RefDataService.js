'use strict';

const request = require('request');
const mongoDB = require('../db/mongoDB');

class RefDataService {
    constructor() {
        console.log('refData service constructor called');
    }

    getEntitiesByType(type) {
        return this.getEntityBySymbol(type, null);
    }

    getEntityBySymbol(type, symbol) {
        let query = symbol ? { symbol } : {};
        return new Promise((resolve, reject) => {
            mongoDB.onConnect((err, db, objectId) => {
                if (err) {
                    reject({
                        success: 'false', error: err
                    });
                } else {
                    db.collection(type).find(query, { _id: 0 }).toArray((err, mongoRes) => {
                        if (err) {
                            reject({
                                success: 'false', error: err
                            });
                        }
                        if (mongoRes.length > 0) {
                            resolve({
                                success: true,
                                message: symbol ? mongoRes[0] : mongoRes
                            });
                        } else {
                            let errorMsg = symbol ? 'symbol-' + symbol : 'type-' + type;
                            reject({
                                success: 'false',
                                error: errorMsg + ' not found'
                            });
                        }
                        db.close();
                    });
                }
            });
        });
    }
}

module.exports = RefDataService;
//# sourceMappingURL=RefDataService.js.map