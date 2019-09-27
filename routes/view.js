const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
// const leaflet = require("leaflet");

router.get("/all", (req, res) => {
  res.render("view");
});

module.exports = router;
