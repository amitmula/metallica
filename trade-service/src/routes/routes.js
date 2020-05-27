import { Router } from "express";

const routes = Router();
const TradeService = require("../service/TradeService");
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
  if (!req.params.id || isNaN(req.params.id)) {
    console.error("id is missing");
    res.status(500).end('{error : "id is mandatory and must be numeric"}');
  } else {
    tradeService
      .getById(parseInt(req.params.id))
      .then((response) => res.end(JSON.stringify(response.data)))
      .catch((err) => {
        console.error(err);
        if (err.error.endsWith("- not found")) res.status(404);
        res.end(JSON.stringify(err));
      });
  }
});

routes.post("/trade/save", (req, res) => {
  tradeService
    .save(req.body)
    .then((response) => {
      res.end(JSON.stringify(response));
    })
    .catch((err) => {
      console.error(err);
      res.end(JSON.stringify(err));
    });
});

routes.post("/trade/update/:id", (req, res) => {
  if (!req.params.id || isNaN(req.params.id)) {
    console.error("id is missing");
    res.status(500).end('{error : "id is mandatory and must be numeric"}');
  } else {
    tradeService
      .update(parseInt(req.params.id), req.body)
      .then((response) => {
        res.end(JSON.stringify(response));
      })
      .catch((err) => {
        console.error(err);
        if (err.error.endsWith("- not found")) res.status(404);
        res.end(JSON.stringify(err));
      });
  }
});

routes.delete("/trade/delete/:id", (req, res) => {
  if (!req.params.id || isNaN(req.params.id)) {
    console.error("id is missing");
    res.status(500).end('{error : "id is mandatory and must be numeric"}');
  } else {
    tradeService
      .removeById(parseInt(req.params.id))
      .then((response) => {
        res.end(JSON.stringify(response));
      })
      .catch((err) => {
        console.error(err);
        if (err.error.endsWith("- not found")) res.status(404);
        res.end(JSON.stringify(err));
      });
  }
});

export default routes;
