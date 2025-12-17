const express = require("express");
const { getHomePage } = require("../controllers/homePgaeController");
const homePageRouter = new express.Router();

homePageRouter.get("/", getHomePage);

module.exports = homePageRouter;
