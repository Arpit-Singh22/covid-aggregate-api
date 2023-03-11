const express = require("express");
const hotspotStates = require("../controllers/hotspotStates");
const mortality = require("../controllers/mortality");
const totalActive = require("../controllers/totalActive");
const totalDeath = require("../controllers/totalDeath");
const totalRecovered = require("../controllers/totalRecovered");
const CovidRouter = express.Router();
const collection_connection = require("../src/connector").connection;

// totalRecovered
CovidRouter.get("/totalRecovered", totalRecovered);

// total Active
CovidRouter.get("/totalActive", totalActive);

//  total death
CovidRouter.get("/totalDeath", totalDeath);

//hotspotStates
CovidRouter.get("/hotspotStates", hotspotStates);
//healthyStates
CovidRouter.get("/healthyStates", mortality);

module.exports = CovidRouter;
