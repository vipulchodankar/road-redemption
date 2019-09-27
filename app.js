var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

var PORT = 4200;

app.get("/", function(req, res) {
  res.render("home");
});

app.get("*", function(req, res) {
  res.render("404");
});

app.listen(PORT, function() {
  console.log(`Application is running at http://localhost:${PORT}/`);
});
