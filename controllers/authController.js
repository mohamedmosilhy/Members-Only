const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const passport = require("../config/passport");

module.exports = {
  getSignUp: (req, res) => {
    res.render("sign-up");
  },
  postSignUp: async (req, res) => {
    try {
      const { username, password } = req.body;
      let hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, hashedPassword]
      );

      res.redirect("/login");
    } catch (error) {
      if (error.code === "23505") {
        return res.render("sign-up", { message: "Username already exists" });
      }
      res.status(500).send("Server error");
    }
  },
  getLogin: (req, res) => {
    res.render("login");
  },
  authUser: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  logoutUser: (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect("/login");
    });
  },
};
