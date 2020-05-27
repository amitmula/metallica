const DatastoreClient = require("./src/db/DatastoreClient");
const RefDataService = require("./src/service/RefDataService");
async function quickstart() {
  //creating the dataStoreClient and calling allocateIds()
  const refDataService = new RefDataService();

  const trades = await refDataService.getEntities("trades", [
    { key: "tradeId", value: 1001 },
  ]);
  console.log(`\ntrades -> `, trades);

  // const trades = await dataStoreClient.get("commodities");

  // let count = 50;
  // const commoditiesBeingSaved = [];
  // while (count-- > 0) {
  //   const id = await commoditiesDataStore.getId();
  //   commoditiesBeingSaved.push({
  //     key: id,
  //     excludeFromIndexes: ["name"],
  //     data: {
  //       symbol: `TEST-${count}`,
  //       name: `Test Commodity - ${count}`,
  //     },
  //   });
  // }
  // console.log(`commodities being saved -> `, commoditiesBeingSaved);
  // const saveResponse = await commoditiesDataStore.save(commoditiesBeingSaved);
  // console.log(`saveResponse -> ${JSON.stringify(saveResponse)}`);

  // Promise.all(keys).then((keysValue) => {
  // });
  // keysValue.map((key, index) => {
  //   console.log(
  //     `index -> ${index}, id -> ${key}, commodity -> ${commodityEntities[index]}`
  //   );
  // });
  // });
}
quickstart();
