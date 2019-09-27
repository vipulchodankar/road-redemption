const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

router.get("/add",ensureAuthenticated, (req, res) => res.render("addPothole"));

module.exports = router;
