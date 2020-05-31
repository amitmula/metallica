import PubSubClient from "@amitmula/metallica-pubsub-client";

class NotificationService {
  constructor(io) {
    this.pubsubClient = new PubSubClient();
    this.wSocketClient = io;
    this.subscriptionName = "trade-events-subscription";
    console.log(`notification service constructor called`);
  }

  messageHandler = (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: -> `, message.data.toString());
    console.log(`\tAttributes: ${message.attributes}`);
    message.ack();
  };

  startListening = () => {
    console.log(
      `starting to read messages from pubsub topic -> ${this.subscriptionName}`
    );

    setInterval(() => {
      console.log(`checking for messages...`);
      this.pubsubClient.subscribe(
        this.subscriptionName,
        3,
        this.messageHandler
      );
    }, 5000);
  };
}
module.exports = NotificationService;
