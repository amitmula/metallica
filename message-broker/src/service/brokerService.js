const config = require('config');
const mqBroker = require('../mq/mqProducer');

class BrokerService {
    constructor() {
       console.log('broker service constructor called')
    }

    addToTradeQueue(tradeDetails) {
        return new Promise((resolve, reject) => {
            mqBroker.addMessage(config.get("RabbitConfig.trade_exchange_key"), tradeDetails).then( response => {
                resolve({
                    success: 'true', message : response.message
                })
            }).catch(err => {
                reject({
                    success: 'false', error : err.error
                })
            })
        })
    }

    addToMarketDataQueue(marketDataDetails) {
        return new Promise((resolve, reject) => {
            mqBroker.addMessage(config.get("RabbitConfig.marketData_exchange_key"), marketDataDetails).then( response => {
                resolve({
                    success: 'true', message : response.message
                })
            }).catch(err => {
                reject({
                    success: 'false', error : err.error
                })
            })
        })
    }
}

module.exports = BrokerService;
