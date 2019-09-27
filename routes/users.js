const express = require("express");
const router = express.Router();

// Login Page
router.get("/login", (req, res) => res.send("Login Here!"));

// Register Page
router.get("/register", (req, res) => res.send("Register Here!"));

module.exports = router;
