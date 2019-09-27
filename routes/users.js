const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const User = require("../models/User");

// Login Page
router.get("/login", (req, res) => res.render("login"));

// Register Page
router.get("/register", (req, res) => res.render("register"));

// Register Request
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  // Check Required Fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields." });
  }

  // Check if passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match." });
  }

  // Check if password length > 6
  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast 6 characters." });
  }

  if (errors.length > 0) {
    // Send data back to register view
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // Create User
    const newUser = new User({
      name,
      email,
      password
    });

    // Hash Password
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        // Set Password to Hashed
        newUser.password = hash;
        // Save User
        newUser
          .save()
          .then(user => {
            req.flash("success_msg", "You are now registered and can log in!");

            res.redirect("/users/login");
          })
          .catch(err => console.log(err));
      })
    );
  }
});

// Login Request
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

module.exports = router;
