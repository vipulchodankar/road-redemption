const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").MongoURI;

// MongoDB Connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// EJS SETUP
app.use(expressLayouts);
app.set("view engine", "ejs");

// Static Assets
app.use(express.static("public"));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "keyboard",
    resave: true,
    saveUninitialized: true
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/users", require("./routes/users"));
app.use("/potholes", require("./routes/potholes"));
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 6969;

app.listen(
  PORT,
  console.log(`Application is running at http://localhost:${PORT}/`)
).on('error', function(err){
});
