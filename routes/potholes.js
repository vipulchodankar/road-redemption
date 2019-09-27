const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

router.get("/add", ensureAuthenticated, (req, res) => res.render("addPothole"));

router.get("/view", (req, res) => {
  res.render("view");
});

// For invalid URLS
router.get("*", (req, res) => {
  res.render("404", {
    link: "/potholes/view",
    msg: "View all instead?"
  });
});

module.exports = router;
