import DataStoreClient from "@amitmula/metallica-datastore-client";
import Trade from "../model/trade";

class TradeService {
  constructor() {
    this.dataStoreClient = new DataStoreClient();
    console.log(`trade service constructor called`);
  }

  async save(trades) {
    return new Promise((resolve, reject) => {
      trades.map(trade => {
        let tradeObj = new Trade(trade);
        let validationResult = tradeObj.validate();
        if (validationResult.error) {
          reject({
            success: "false",
            error: validationResult.error.details[0].message,
          });
        } 
      })

      const tradeEntitiesToPush = [];
      
      const ids = await this.dataStoreClient.getAllocatedIds(
        "trades",
        trades.length
      );

      tradeEntitiesToPush.push(
        trades.map((trade, index) => ({
          key: ids[index],
          excludeFromIndexes: ["tradeDate", "qty", "price"],
          data: trade,
        }))
      );
      this.dataStoreClient.save(tradeEntitiesToPush.flatMap((x) => x))
      .then(saveResponse => {
        resolve({
          success: "true",
          data: trades,
          result: saveResponse,
        });
      })
      .catch(err => {
        reject({
          success: "false",
          error: err
        });
      })
    });
  }

  async getAllTrades() {
    return new Promise((resolve, reject) => {
      this.dataStoreClient.get("trades", [])
      .then(trades => {
        resolve({
          success: true,
          data: trades,
        });
      })
      .catch(err => {
        reject({
          success: false,
          error: err,
        });
      })
    })
  }
  
  async getTradeById(id) {
    return await this.dataStoreClient.get("trades", [{ tradeId: id }]);
  }

  async update(id, trade) {
    return new Promise((resolve, reject) => {
      const tradeToUpdate = await this.getTradeById(id).find(trade => trade.tradeId === id);
      if(tradeToUpdate) {
        const saveResponse = await this.dataStoreClient.save({
          ...tradeToUpdate,
          ...trade
        })
        resolve({
          success: "true",
          data: trade,
          result: saveResponse,
        });
      } else {
        reject({
          success: false,
          error: `tradeId ${id} not found`,
        })
      }
    });
  }

  async removeById(id) {
    const tradeToDelete = this.trades.find((trade) => trade.tradeId === id);
    tradeToDelete && this.trades.splice(this.trade.findIndex(tradeToDelete), 1);
    return new Promise((resolve, reject) => {
      (tradeToDelete &&
        resolve({
          success: "true",
          data: "trade has been deleted",
        })) ||
        reject({
          success: false,
          error: `trade with id ${id} not found`,
        });
    });
  }

  async sendDataToMessageBroker(tradeData) {
    console.log("data sent to message broker");
  }
}

module.exports = TradeService;
