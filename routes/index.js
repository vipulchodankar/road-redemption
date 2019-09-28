const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

router.get("/", (req, res) => res.render("welcome"));

router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user
  })
);

// For invalid URLS
router.get("*", (req, res) => {
  res.render("404", {
    link: "/",
    msg: "View Home?"
  });
});

module.exports = router;
