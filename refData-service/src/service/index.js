import DataStoreClient from "@amitmula/metallica-datastore-client";

const commodityEntities = require("../../collections/commodities.json");
const counterPartyEntities = require("../../collections/counterparties.json");
const locationEntities = require("../../collections/locations.json");
const tradeEntities = require("../../collections/trades.json");

class RefDataService {
  constructor() {
    this.dataStoreClient = new DataStoreClient();
    console.log("refData service constructor called");
    // this.getEntitiesByType("commodities").then((commodities) => {
    //   if (commodities.length === 0) this.pushEntities();
    // });
  }

  async pushEntities() {
    const entitiesToPush = [];
    let ids = await this.dataStoreClient.getAllocatedIds(
      "commodities",
      commodityEntities.length
    );
    entitiesToPush.push(
      commodityEntities.map((commodity, index) => ({
        key: ids[index],
        excludeFromIndexes: ["name"],
        data: commodity,
      }))
    );
    ids = await this.dataStoreClient.getAllocatedIds(
      "counterparties",
      counterPartyEntities.length
    );
    entitiesToPush.push(
      counterPartyEntities.map((counterParty, index) => ({
        key: ids[index],
        excludeFromIndexes: ["name"],
        data: counterParty,
      }))
    );
    ids = await this.dataStoreClient.getAllocatedIds(
      "locations",
      locationEntities.length
    );
    entitiesToPush.push(
      locationEntities.map((location, index) => ({
        key: ids[index],
        excludeFromIndexes: ["name"],
        data: location,
      }))
    );
    ids = await this.dataStoreClient.getAllocatedIds(
      "trades",
      tradeEntities.length
    );
    entitiesToPush.push(
      tradeEntities.map((trade, index) => ({
        key: ids[index],
        excludeFromIndexes: ["tradeDate", "qty", "price"],
        data: trade,
      }))
    );
    await this.dataStoreClient.save(entitiesToPush.flatMap((x) => x));
  }

  async getEntities(type, attrMap = []) {
    return await this.dataStoreClient.get(type, attrMap);
  }
}

module.exports = RefDataService;
