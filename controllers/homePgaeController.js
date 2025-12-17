const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const passport = require("../config/passport");
const { get } = require("../routes/authRouter");

module.exports = {
  getHomePage: async (req, res) => {
    const messages = await pool.query(
      "SELECT messages.id, messages.title, messages.content, messages.created_at, users.username AS author FROM messages LEFT JOIN users ON messages.user_id = users.id ORDER BY messages.created_at DESC"
    );

    res.render("index", {
      user: req.user,
      messages: messages.rows,
      userIsMemberOrAdmin:
        req.user && (req.user.is_member || req.user.is_admin),
    });
  },

  getJoinClubPage: (req, res) => {
    res.render("joinClub", { user: req.user });
  },

  postJoinClub: async (req, res) => {
    if (process.env.CLUB_PASSCODE === req.body.secretCode) {
      await pool.query("UPDATE users SET is_member = true WHERE id = $1", [
        req.user.id,
      ]);
    }
    res.redirect("/");
  },
  getCreateMessagePage: (req, res) => {
    res.render("createMessage", { user: req.user });
  },
  postCreateMessage: async (req, res) => {
    const { title, content } = req.body;
    await pool.query(
      "INSERT INTO messages (title, content, user_id, created_at) VALUES ($1, $2, $3, NOW())",
      [title, content, req.user.id]
    );
    res.redirect("/");
  },
};
