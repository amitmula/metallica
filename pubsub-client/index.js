"use strict";
const { PubSub } = require("@google-cloud/pubsub");

class PubSubClient {
  constructor() {
    this.pubSubClient = new PubSub();
  }

  async createTopic(topicName) {
    const [topic] = await this.pubSubClient.createTopic(topicName);
    console.log(`Topic ${topic.name} created.`);
  }

  async publish(topicName, message) {
    await this.pubSubClient.topic(topicName).get({ autoCreate: true });
    const messageId = await this.pubSubClient
      .topic(topicName)
      .publish(Buffer.from(message));
    return messageId;
  }

  subscribe(subscriptionName, pollTimeout, messageHandler) {
    const subscription = this.pubSubClient.subscription(subscriptionName);
    subscription.on("message", messageHandler);
    setTimeout(() => {
      subscription.removeListener("message", messageHandler);
    }, pollTimeout * 1000);
  }
}

module.exports = PubSubClient;
