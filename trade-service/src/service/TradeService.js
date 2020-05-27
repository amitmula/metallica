import Trade from "../model/trade";

class TradeService {
  constructor() {
    this.trades = [];
    console.log(`trade service constructor called`);
  }

  save(trade) {
    return new Promise((resolve, reject) => {
      let tradeObj = new Trade(trade);
      let validationResult = tradeObj.validate();
      if (validationResult.error) {
        reject({
          success: "false",
          error: validationResult.error.details[0].message,
        });
      } else {
        this.trades.push(trade);
        resolve({
          success: "true",
          data: trade,
        });
      }
    });
  }

  getAllTrades() {
    return new Promise((resolve, reject) => {
      resolve({
        success: "true",
        data: this.trades,
      });
    });
  }

  update(id, trade) {
    const tradeToUpdate = this.trades.find((trade) => trade.tradeId === id);
    const updatedTrade = tradeToUpdate && {
      ...tradeToUpdate,
      ...trade,
      id: tradeToUpdate.tradeId,
    };
    const index = updatedTrade && this.trades.findIndex(tradeToUpdate);
    index && this.trades.splice(index, 1, updatedTrade);
    return new Promise((resolve, reject) => {
      (updatedTrade &&
        resolve({
          success: true,
          data: updatedTrade,
        })) ||
        reject({
          success: false,
          error: `trade with id ${id} not found`,
        });
    });
  }

  removeById(id) {
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

  getById(id) {
    const trade = this.trades.find((trade) => trade.tradeId === id);
    return new Promise((resolve, reject) => {
      (trade &&
        resolve({
          success: true,
          data: trade,
        })) ||
        reject({
          success: false,
          error: `trade with id ${id} not found`,
        });
    });
  }

  sendDataToMessageBroker(tradeData) {
    console.log("data sent to message broker");
  }
}

module.exports = TradeService;
