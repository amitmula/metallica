import Trade from '../model/trade';
const request = require('request');
const mongoDB = require('../db/mongoDB');

class TradeService {
  constructor() {
    console.log('trade service constructor called')
  }

  save(trade) {
    return new Promise((resolve, reject) => {
      let tradeObj = new Trade(trade);
      let validationResult = tradeObj.validate();
      if (validationResult.error) {
        reject({
          success: 'false', error: validationResult.error.details[0].message
        })
      } else {
        mongoDB.onConnect((err, db, objectId) => {
          if (err) {
            console.log(err.stack);
            reject({
              error: err
            })
          } else {
            db.collection("counters").findAndModify(
              { counterId: 'tradeId' },
              [['_id', 'asc']],  // sort order
              { $inc: { seq: 1 } },
              { upsert: true, new: true },
              (err, output) => {
                if (err) {
                  console.log(err);
                  db.close();
                  reject({
                    error: err
                  })
                } else {
                  tradeObj.tradeId = output.value.seq;
                  db.collection("trades").insert(tradeObj, (err, res) => {
                    if (err) {
                      console.log(err);
                      reject({
                        error: err
                      })
                      db.close();
                    }
                    resolve({
                      success: 'true', id: tradeObj.tradeId, message: 'trade has been saved'
                    })
                    db.close();
                  });
                  tradeObj.action = 'add'
                  this.sendDataToMessageBroker(tradeObj);
                }
              });
          }
        });
      }
    })
  }

  getAllTrades() {
    return new Promise((resolve, reject) => {
      mongoDB.onConnect((err, db, objectId) => {
        if (err) {
          console.log(err.stack);
          reject({
            error: err
          })
        } else {
          db.collection('trades').find({}, { _id: 0 }).toArray((err, mongoRes) => {
            if (err) {
              console.log(err.stack);
              reject({
                error: err
              })
            } else {
              if (mongoRes.length > 0) {
                var data = JSON.stringify(mongoRes);
                resolve({
                  success: 'true', message: mongoRes
                });
              } else {
                reject({
                  success: 'false', error: 'No records found'
                })
              }
            }
            db.close();
          });
        }
      });
    })
  }

  update(id, trade) {
    return new Promise((resolve, reject) => {
      this.getById(id).then(
        response => {
          let tradeObj = new Trade(trade);
          tradeObj.tradeId = id;
          let validationResult = tradeObj.validate();
          if (validationResult.error) {
            console.error(validationResult)
            reject({
              success: 'false', error: validationResult.error.details[0].message
            })
          } else {
            mongoDB.onConnect((err, db, objectId) => {
              if (err) {
                console.error(err)
                reject({
                  success: 'false', error: err
                })
              }
              else {
                db.collection("trades").update({ tradeId: id }, tradeObj, (err, res) => {
                  if (err) {
                    console.error(err)
                    reject({
                      success: 'false', error: err
                    })
                    db.close();
                  }
                  resolve({
                    success: 'true', message: 'trade has been updated'
                  })
                  db.close();
                });
                tradeObj.action = 'update'
                this.sendDataToMessageBroker(tradeObj);
              }
            });
          }
        }).catch(err => {
          console.error(err)
          reject({
            success: 'false', error: err.error
          })
        });
    });
  }

  removeById(id) {
    return new Promise((resolve, reject) => {
      this.getById(id).then(
        response => {
          let tradeObj = response.message;
          mongoDB.onConnect((err, db, objectId) => {
            if (err) {
              console.error(err)
              reject({
                success: 'false', error: err
              })
            }
            else {
              db.collection("trades").remove({ tradeId: id }, (err, res) => {
                if (err) {
                  console.error(err)
                  db.close();
                  reject({
                    success: 'false', error: err
                  })
                }
                resolve({
                  success: 'true', message: 'trade has been deleted'
                })
              });
            }
            db.close();
          })
          tradeObj.action = 'remove'
          this.sendDataToMessageBroker(tradeObj);
        }).catch(err => {
          console.error(err)
          reject({
            success: 'false', error: err.error
          })
        });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      mongoDB.onConnect((err, db, objectId) => {
        if (err) {
          console.error(err)
          reject({
            success: 'false', error: err
          })
        }
        else {
          db.collection("trades").find({ tradeId: id }, { _id: 0 }).toArray((err, mongoRes) => {
            if (err) {
              console.error(err)
              reject({
                success: 'false', error: err
              })
            }
            if (mongoRes.length > 0) {
              resolve({
                success: true,
                message: mongoRes[0]
              })
            } else {
              reject({
                success: 'false', error: 'tradeId : ' + id + ' - not found'
              })
            }
          });
        }
        db.close();
      });
    })
  }

  sendDataToMessageBroker(tradeData) {
    var options = {
      url: "http://localhost:8091/addToTradeQueue",
      method: 'POST',
      json: tradeData
    };
    request(options, (error, response, body) => {
      if (error) {
        console.error(error)
      }
      console.log(body);
    });
  }
}

module.exports = TradeService;
