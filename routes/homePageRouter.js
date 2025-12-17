const express = require("express");
const {
  getHomePage,
  getJoinClubPage,
  postJoinClub,
  getCreateMessagePage,
  postCreateMessage
} = require("../controllers/homePgaeController");
const { ensureAuthenticated, ensureMember } = require("../middleware/auth");
const homePageRouter = new express.Router();

homePageRouter.get("/", getHomePage);
homePageRouter.get("/join-club", ensureAuthenticated, getJoinClubPage);
homePageRouter.post("/join-club", ensureAuthenticated, postJoinClub);
homePageRouter.get(
  "/create-message",
  ensureAuthenticated,
  ensureMember,
  getCreateMessagePage
);
homePageRouter.post(
  "/create-message",
  ensureAuthenticated,
  ensureMember,
  postCreateMessage
);

module.exports = homePageRouter;
