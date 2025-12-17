require("dotenv").config();
const express = require("express");
const pool = require("./db/pool");
const authRouter = require("./routes/authRouter");
const session = require("express-session");
const passport = require("./config/passport");
const pgSession = require("connect-pg-simple")(session);
const homePageRouter = require("./routes/homePageRouter");

const app = new express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET || "cats",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

app.use(passport.session());

app.use("/", authRouter);

app.use("/", homePageRouter);

app.listen(process.env.PORT || 3000);
