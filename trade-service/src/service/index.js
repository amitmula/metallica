import DataStoreClient from "@amitmula/metallica-datastore-client";
import Trade from "../model/trade";

class TradeService {
  constructor() {
    this.dataStoreClient = new DataStoreClient();
    console.log(`trade service constructor called`);
  }

  async save(trades) {
    trades.map((trade) => {
      let tradeObj = new Trade(trade);
      let validationResult = tradeObj.validate();
      if (validationResult.error) {
        return new Promise(resolve, (reject) => {
          reject({
            success: "false",
            error: validationResult.error.details[0].message,
          });
        });
      }
    });
    const tradeEntitiesToPush = [];
    const ids = await this.dataStoreClient.getAllocatedIds(
      "trades",
      trades.length
    );
    tradeEntitiesToPush.push(
      trades.map((trade, index) => ({
        key: ids[index],
        excludeFromIndexes: ["tradeDate", "quantity", "price"],
        data: trade,
      }))
    );
    return new Promise((resolve, reject) => {
      this.dataStoreClient
        .save(tradeEntitiesToPush.flatMap((x) => x))
        .then((saveResponse) => {
          resolve({
            success: "true",
            data: trades,
            result: saveResponse,
          });
        })
        .catch((err) => {
          reject({
            success: "false",
            error: err,
          });
        });
    });
  }

  async getAllTrades() {
    return await this.dataStoreClient.get("trades", []);
  }

  async getTradeById(id) {
    return await this.dataStoreClient.get("trades", [
      { key: "tradeId", value: id },
    ]);
  }

  async update(id, trade) {
    let tradeObj = new Trade(trade);
    let validationResult = tradeObj.validate();
    if (validationResult.error) {
      return new Promise((resolve, reject) => {
        reject({
          success: false,
          error: validationResult.error.details[0].message,
        });
      });
    } else {
      const existingTrade = await this.getTradeById(id);
      const updatedTrade = {
        ...existingTrade[0],
        ...trade,
      };
      return this.dataStoreClient.save(updatedTrade);
    }
  }

  async delete(id) {
    const tradeToDelete = (await this.getTradeById(id))[0];
    const keyToDelete = tradeToDelete[this.dataStoreClient.datastoreClient.KEY];
    if (!tradeToDelete) {
      return new Promise((resolve, reject) => {
        reject({
          success: false,
          error: `trade with id ${id} not found`,
        });
      });
    } else {
      return this.dataStoreClient.delete(keyToDelete);
    }
  }

  async sendDataToMessageBroker(tradeData) {
    console.log("data sent to message broker");
  }
}

module.exports = TradeService;
