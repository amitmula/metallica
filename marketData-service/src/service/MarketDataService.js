const request = require('request');
const mongoDB = require('../db/mongoDB');
const config = require('config');
const apiEndpoint = config.get('apiEndpoint.protocol') + "://" + config.get('apiEndpoint.host') + ":" + config.get("apiEndpoint.port") + "/" + config.get("apiEndpoint.contextPath");
const messageBrokerService = apiEndpoint + "/" + config.get("messageBroker.serviceId");
class MarketDataService {
  constructor() {
    this.priceRefreshInterval = 60 * 1000;
    this.priceBracket = {"min": 1500, "max": 2600};
    this.marketDataMap = {}
  }

  getNewPrice() {
    return Math.floor(Math.random() * (this.priceBracket.max - this.priceBracket.min)) + this.priceBracket.min;
  }

  setCommodityPrices(_commodityPrices) {    
    return new Promise((resolve, reject) => {
      _commodityPrices.map(metalPrice => {
        this.setCommodityPrice(metalPrice.symbol, metalPrice.price)
      })
      this.sendDataToMessageBroker(_commodityPrices)
      resolve({
        success:true, message : 'commodity prices updated'
      })
    })
  }

  setCommodityPrice(symbol, price) {
    this.marketDataMap[symbol] = price
  }

  getCommodityPrices(symbol) {
    var query = (symbol && symbol != 'all') ? {
      symbol
    } : {};
    return new Promise((resolve, reject) => {
      mongoDB.onConnect((err, db, objectId) => {
        if (err) {
          console.error(err.stack);
          reject({
            error: err
          })
        } else {
          db.collection('commodities').find(query, { _id: 0 }).toArray((err, mongoRes) => {
            if (err) {
              console.error(err.stack);
              reject({
                success: 'false', error: err
              })
            } else {
              if (mongoRes.length > 0) {
                mongoRes.map(metal => {
                  if (Object.keys(this.marketDataMap).includes(metal.symbol)) {
                    console.log('metal price found in map ----> ' + this.marketDataMap[metal.symbol])
                    metal.price = this.marketDataMap[metal.symbol]
                  }
                  else {
                    metal.price = this.getNewPrice()
                    this.marketDataMap[metal.symbol] = metal.price
                  }
                  console.log('marketDataMap ----> ' + JSON.stringify(this.marketDataMap))
                  console.log('metal -> ' + JSON.stringify(metal))
                });
                console.log('MongoRes ---> ', JSON.stringify(mongoRes))
                var data = JSON.stringify(mongoRes);
                resolve({
                  success: 'true', message: mongoRes
                });
              } else {
                let message = symbol ? 'symbol - ' + symbol + ' not found' : 'No records found'
                reject({
                  success: 'false', error: message
                })
              }
            }
          })
        }
      })
    })
  }

  sendDataToMessageBroker(marketData) {
    var options = {
      url: messageBrokerService + "/addToMarketDataQueue",
      method: 'POST',
      json: marketData
    };
    request(options, (error, response, body) => {
      if (error) {
        console.error(error)
      }
      console.log(response);
    });
  }
}

module.exports = MarketDataService;
