const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

const passport = require("passport");
// Load User model
const Pothole = require("../models/Pothole");

router.get("/add", ensureAuthenticated, (req, res) => res.render("addPothole"));

router.get("/view", (req, res) => {
  res.render("view");
});

router.post("/register", (req, res) => {
  const { latitude, longitude, image } = req.body;
  let errors = [];
  // Check Required Fields
  if (!latitude || !longitude) {
    errors.push({ msg: "Please fill in all fields." });
  }

  if (errors.length > 0) {
    // Send data back to register view
    res.render("addPothole", {
      errors,
      latitude,
      longitude,
      image
    });
  } else {
    // Create Pothole
    const newPothole = new Pothole({
      latitude,
      longitude,
      image
    });

    newPothole
      .save()
      .then( () => {
        req.flash("success_msg", "Another step towards a safer journey.");

        res.redirect("/potholes/view");
      })
      .catch(err => console.log(err));
  }
});

// For invalid URLS
router.get("*", (req, res) => {
  res.render("404", {
    link: "/potholes/view",
    msg: "View all instead?"
  });
});

module.exports = router;
