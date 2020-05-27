// Copyright 2016 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use strict";

// [START datastore_quickstart]
// Imports the Google Cloud client library
const { Datastore } = require("@google-cloud/datastore");

// Creates a client
const datastoreClient = new Datastore();

const NO_OF_KEYS_TO_FETCH = 25;

const getAllocatedIds = async (kind) => {
  const allocatedIds = await datastoreClient
    .allocateIds(datastoreClient.key([kind]), NO_OF_KEYS_TO_FETCH)
    .then((keys) => {
      // console.log(`\n\nkeys generated -> `, keys[0]);
      return keys[0];
    })
    .catch((err) => {
      console.error(err);
    });
  return allocatedIds;
};

async function quickstart() {
  const kind = "commodities";
  console.log(`waiting to get keys...`);
  const allocatedIds = await getAllocatedIds(kind);
  const allocatedId = allocatedIds[0];
  console.log(`\nkey -> `, allocatedId);

  const commodity = {
    key: allocatedId,
    excludeFromIndexes: ["name"],
    data: {
      symbol: "TEST",
      name: "Test Commodity",
    },
  };

  console.log(`\commodity -> `, commodity);

  const saveResponse = await datastoreClient.save(commodity);
  console.log(`saveResponse -> ${JSON.stringify(saveResponse)}`);
}
quickstart();
