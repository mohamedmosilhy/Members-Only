const express = require("express");
const authRouter = express.Router();
const passport = require("../config/passport");

const {
  getSignUp,
  postSignUp,
  getLogin,
} = require("../controllers/authController");

authRouter.get("/sign-up", getSignUp);

authRouter.post("/sign-up", postSignUp);

authRouter.get("/login", getLogin);
authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = authRouter;
