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

router.post("/add", (req, res) => {
  const { y, x, image } = req.body;

  let errors = [];
  // Check Required Fields
  if (!x || !y) {
    errors.push({ msg: "Please fill in all fields." });
  }

  if ((x < -90 || x > 90) && (y < -180 || y > 180)) {
    errors.push({ msg: "Please enter valid coordinates." });
  }

  else if (x < -90 || x > 90) {
    errors.push({ msg: "Please enter valid latitude value." });
  }

  else if (y < -180 || y > 180) {
    errors.push({ msg: "Please enter valid longitude value." });
  }

  if (errors.length > 0) {
    // Send data back to register view
    res.render("addPothole", {
      errors,
      x,
      y,
      image
    });
  } else {
    // Create Pothole
    const newPothole = new Pothole({
      x,
      y,
      image
    });

    newPothole
      .save()
      .then(() => {
        req.flash("success_msg", "Another step towards a safer journey.");

        res.redirect("/potholes/add");
      })
      .catch(err => console.log(err));
  }
});

// For invalid URLS
// router.get("*", (req, res) => {
//   res.render("404", {
//     link: "/potholes/view",
//     msg: "View all instead?"
//   });
// });

module.exports = router;
