const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
// var bodyParser = require("body-parser");

// app.use(express.static("public"));
// EJS SETUP
app.use(expressLayouts);
app.set("view engine", "ejs");

// app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 4200;

app.listen(PORT, function() {
  console.log(`Application is running at http://localhost:${PORT}/`);
});
