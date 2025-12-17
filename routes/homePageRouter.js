const express = require("express");
const {
  getHomePage,
  getJoinClubPage,
  postJoinClub,
  getCreateMessagePage,
  postCreateMessage,
  deleteMessage,
} = require("../controllers/homePgaeController");
const {
  ensureAuthenticated,
  ensureMember,
  ensureAdmin,
} = require("../middleware/auth");
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

homePageRouter.post(
  "/delete-message/:id",
  ensureAuthenticated,
  ensureAdmin,
  deleteMessage
);

module.exports = homePageRouter;
