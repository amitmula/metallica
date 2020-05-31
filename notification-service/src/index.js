import app from "./app/app";
const config = require("config");
const socketio = require("socket.io");
const NotificationService = require("./service/NotificationService");

const { appPort = config.get("appConfig.port") } = process.env;

let server = app.listen(appPort, () => {
  const notificationService = new NotificationService(io);
  notificationService.startListening();
  console.log("Listening on port ", appPort);
});

const io = socketio(server);

const TRADE_MODIFIED = {
  channel: "trade data modified",
};

const MARKET_DATA_MODIFIED = {
  channel: "market data modified",
};

const NOTIFICATION_TYPE = {
  marketDataModified: MARKET_DATA_MODIFIED,
  tradeDataModified: TRADE_MODIFIED,
};

io.on("connect", function (clientConnection) {
  console.log(
    "-----> new socket connection with client id",
    clientConnection.id
  );
  console.log(
    "-----> new socket connection with client headers",
    clientConnection.handshake.headers
  );
  console.log(
    "-----> connection upgraded from polling?",
    clientConnection.conn.upgraded
  );
  console.log(
    "-----> connection upgrading from polling?",
    clientConnection.conn.upgrading
  );

  clientConnection.on("join channel", function (channelName, callback) {
    clientConnection.join(
      NOTIFICATION_TYPE[channelName].channel,
      callback("joined " + channelName)
    );
    console.log(
      "client",
      clientConnection.id,
      "joined socket channel",
      NOTIFICATION_TYPE[channelName].channel
    );
  });
});

io.on("disconnect", function () {
  console.log("connection disconnected.");
});
