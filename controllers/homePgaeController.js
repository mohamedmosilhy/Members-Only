const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const passport = require("../config/passport");
const { get } = require("../routes/authRouter");

module.exports = {
  getHomePage: async (req, res) => {
    try {
      const messages = await pool.query(
        "SELECT messages.id, messages.title, messages.content, messages.created_at, users.username AS author FROM messages LEFT JOIN users ON messages.user_id = users.id ORDER BY messages.created_at DESC"
      );

      res.render("index", {
        user: req.user,
        messages: messages.rows,
        userIsMemberOrAdmin:
          req.user && (req.user.is_member || req.user.is_admin),
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).render("index", {
        user: req.user,
        messages: [],
        userIsMemberOrAdmin:
          req.user && (req.user.is_member || req.user.is_admin),
        error: "Failed to load messages. Please try again later.",
      });
    }
  },

  getJoinClubPage: (req, res) => {
    try {
      if (!req.user) {
        return res.redirect("/login");
      }
      res.render("joinClub", { user: req.user });
    } catch (error) {
      console.error("Error loading join club page:", error);
      res.status(500).send("Server error");
    }
  },

  postJoinClub: async (req, res) => {
    try {
      if (!req.user) {
        return res.redirect("/login");
      }

      if (process.env.CLUB_PASSCODE === req.body.secretCode) {
        await pool.query("UPDATE users SET is_member = true WHERE id = $1", [
          req.user.id,
        ]);
        res.redirect("/");
      } else {
        res.render("joinClub", {
          user: req.user,
          error: "Invalid secret code. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error joining club:", error);
      res.status(500).render("joinClub", {
        user: req.user,
        error: "Failed to join club. Please try again later.",
      });
    }
  },

  getCreateMessagePage: (req, res) => {
    try {
      if (!req.user) {
        return res.redirect("/login");
      }
      if (!req.user.is_member && !req.user.is_admin) {
        return res.redirect("/join-club");
      }
      res.render("createMessage", { user: req.user });
    } catch (error) {
      console.error("Error loading create message page:", error);
      res.status(500).send("Server error");
    }
  },

  postCreateMessage: async (req, res) => {
    try {
      if (!req.user) {
        return res.redirect("/login");
      }
      if (!req.user.is_member && !req.user.is_admin) {
        return res.redirect("/join-club");
      }

      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).render("createMessage", {
          user: req.user,
          error: "Title and content are required.",
        });
      }

      await pool.query(
        "INSERT INTO messages (title, content, user_id, created_at) VALUES ($1, $2, $3, NOW())",
        [title, content, req.user.id]
      );
      res.redirect("/");
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).render("createMessage", {
        user: req.user,
        error: "Failed to create message. Please try again later.",
      });
    }
  },

  deleteMessage: async (req, res) => {
    try {
      if (!req.user) {
        return res.redirect("/login");
      }
      if (!req.user.is_admin) {
        return res.status(403).redirect("/");
      }

      const messageId = req.params.id;

      if (!messageId || isNaN(messageId)) {
        return res.status(400).redirect("/");
      }

      const result = await pool.query("DELETE FROM messages WHERE id = $1", [
        messageId,
      ]);

      if (result.rowCount === 0) {
        console.warn("Attempted to delete non-existent message:", messageId);
      }

      res.redirect("/");
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).redirect("/");
    }
  },
};
