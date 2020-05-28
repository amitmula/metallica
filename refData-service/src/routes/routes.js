import { Router } from "express";

const routes = Router();
const RefDataService = require("../service");
const pjson = require("../../package.json");
const config = require("config");
const os = require("os");

const refDataService = new RefDataService();
/**
 * GET home page
 */
routes.get("/", (req, res) => {
  res.render("index", {
    title: config.get("appConfig.appName"),
    version: pjson.version,
    hostInfo: {
      name: os.hostname,
      type: os.type(),
      cpuArch: os.arch(),
      uptime: os.uptime(),
      totalMem: os.totalmem(),
      freeMem: os.freemem(),
    },
  });
});

routes.get(config.get("appConfig.healthCheckUrl"), function (req, res) {
  res.sendStatus(200);
});

/**
 * GET reference entity by type
 */
routes.get("/ref/:type", (req, res) => {
  refDataService
    .getEntities(req.params.type)
    .then((response) => {
      res.end(JSON.stringify(response));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end(JSON.stringify(err));
    });
});

/**
 * GET reference entity by symbol name
 */
routes.get("/ref/:type/:symbol", (req, res) => {
  refDataService
    .getEntities(req.params.type, [{ key: "symbol", value: req.params.symbol }])
    .then((response) => {
      res.end(JSON.stringify(response));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end(JSON.stringify(err));
    });
});

export default routes;
