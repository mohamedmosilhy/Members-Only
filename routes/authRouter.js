const express = require("express");
const authRouter = express.Router();

const {
  getSignUp,
  postSignUp,
  getLogin,
  authUser,
  logoutUser,
} = require("../controllers/authController");

authRouter.get("/signup", getSignUp);

authRouter.post("/signup", postSignUp);

authRouter.get("/login", getLogin);
authRouter.post("/login", authUser);

authRouter.get("/logout", logoutUser);

module.exports = authRouter;
