const express = require("express");
const authRouter = express.Router();

const {
  getSignUp,
  postSignUp,
  getLogin,
  authUser,
  logoutUser,
} = require("../controllers/authController");

authRouter.get("/sign-up", getSignUp);

authRouter.post("/sign-up", postSignUp);

authRouter.get("/login", getLogin);
authRouter.post("/login", authUser);

authRouter.get("/logout", logoutUser);

module.exports = authRouter;
