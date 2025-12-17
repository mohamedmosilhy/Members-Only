const express = require("express");
const {
  getHomePage,
  getJoinClubPage,
  postJoinClub,
} = require("../controllers/homePgaeController");
const ensureAuthenticated = require("../middleware/auth");
const homePageRouter = new express.Router();

homePageRouter.get("/", getHomePage);
homePageRouter.get("/join-club", ensureAuthenticated, getJoinClubPage);
homePageRouter.post("/join-club", ensureAuthenticated, postJoinClub);

module.exports = homePageRouter;
