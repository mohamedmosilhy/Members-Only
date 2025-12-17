const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const passport = require("../config/passport");

module.exports = {
  getSignUp: (req, res) => {
    try {
      res.render("sign-up");
    } catch (error) {
      console.error("Error loading sign up page:", error);
      res.status(500).send("Server error");
    }
  },

  postSignUp: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        return res.render("sign-up", {
          message: "Username and password are required",
        });
      }

      if (username.length < 3) {
        return res.render("sign-up", {
          message: "Username must be at least 3 characters long",
        });
      }

      if (password.length < 6) {
        return res.render("sign-up", {
          message: "Password must be at least 6 characters long",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, hashedPassword]
      );

      res.redirect("/login");
    } catch (error) {
      console.error("Error during sign up:", error);
      if (error.code === "23505") {
        return res.render("sign-up", {
          message: "Username already exists. Please choose another one.",
        });
      }
      res.status(500).render("sign-up", {
        message: "Server error. Please try again later.",
      });
    }
  },

  getLogin: (req, res) => {
    try {
      res.render("login");
    } catch (error) {
      console.error("Error loading login page:", error);
      res.status(500).send("Server error");
    }
  },

  authUser: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: false,
  }),

  logoutUser: (req, res, next) => {
    try {
      req.logout((err) => {
        if (err) {
          console.error("Error during logout:", err);
          return next(err);
        }
        res.redirect("/login");
      });
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).send("Server error");
    }
  },
};
