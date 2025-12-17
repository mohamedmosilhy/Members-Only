const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const passport = require("../config/passport");

module.exports = {
  getHomePage: async (req, res) => {
    const messages = await pool.query(
      "SELECT messages.id, messages.title, messages.content, messages.created_at, users.username AS author FROM messages LEFT JOIN users ON messages.user_id = users.id ORDER BY messages.created_at DESC"
    );

    console.log(messages.rows);

    res.render("index", {
      user: req.user,
      messages: messages.rows,
      userIsMemberOrAdmin:
        req.user && (req.user.is_member || req.user.is_admin),
    });
  },
};
