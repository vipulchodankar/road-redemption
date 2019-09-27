const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const app = express();

// DB Config
const db = require("./config/keys").MongoURI;

// MongoDB Connection
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

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
