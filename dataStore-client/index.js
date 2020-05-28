"use strict";
const { Datastore } = require("@google-cloud/datastore");

class DataStoreClient {
  constructor() {
    this.datastoreClient = new Datastore();
  }

  getAllocatedIds = async (kind, count) => {
    console.log(`\ngetting keys...`);
    const allocatedIds = this.datastoreClient
      .allocateIds(this.datastoreClient.key([kind]), count)
      .then((keys) => {
        return keys[0];
      })
      .catch((err) => {
        console.error(err);
      });
    return allocatedIds;
  };

  save = async (entity) => {
    return this.datastoreClient.save(entity);
  };

  get = async (kind, filterAttr) => {
    const query = this.datastoreClient.createQuery(kind);
    filterAttr.map((attr) => {
      query.filter(attr.key, attr.value);
    });
    return new Promise((resolve, reject) => {
      this.datastoreClient.runQuery(query, (err, entities, info) => {
        if (err) reject(err);
        resolve(entities);
      });
    });
  };

  delete = async (entityKey) => {
    return this.datastoreClient.delete(entityKey);
  };
}

module.exports = DataStoreClient;
