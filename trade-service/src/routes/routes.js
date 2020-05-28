import { Router } from "express";

const routes = Router();
const TradeService = require("../service");
const pjson = require("../../package.json");
const config = require("config");
const os = require("os");
const tradeService = new TradeService();
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
 * GET all trades
 */
routes.get("/trade/all", (req, res) => {
  tradeService
    .getAllTrades()
    .then((response) => {
      res.end(JSON.stringify(response));
    })
    .catch((err) => {
      console.error(err);
      res.end(JSON.stringify(err));
    });
});

routes.get("/trade/:id", (req, res) => {
  tradeService
    .getTradeById(parseInt(req.params.id))
    .then((response) => res.end(JSON.stringify(response)))
    .catch((err) => {
      console.error(err);
      res.status(500).end(JSON.stringify(err));
    });
});

routes.post("/trade/save", (req, res) => {
  tradeService
    .save(req.body)
    .then((response) => {
      res.end(JSON.stringify(response));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end(JSON.stringify(err));
    });
});

routes.post("/trade/update/:id", (req, res) => {
  tradeService
    .update(parseInt(req.params.id), req.body)
    .then((response) => {
      res.end(JSON.stringify(response));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end(JSON.stringify(err));
    });
});

routes.delete("/trade/delete/:id", (req, res) => {
  tradeService
    .delete(parseInt(req.params.id))
    .then((response) => {
      res.end(JSON.stringify(response));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end(JSON.stringify(err));
    });
});

export default routes;
