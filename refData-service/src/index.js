import app from "./app/app";
const config = require("config");
const appPort = process.env.PORT || config.get("appConfig.port");
app.listen(appPort, () => {
  console.log("Listening on port ", appPort);
});
