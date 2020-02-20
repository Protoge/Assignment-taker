const express = require("express");
const router = express.Router();
const { Assignment, Complete } = require("../models/assignment.model");
const Student = require("../models/student.model");
const passport = require("passport");
const ensureAuthenticated = require("../config/authenticated");

// CHANGE THIS TO SHOW USER ONLY ASSIGNMENTS
router.get("/", ensureAuthenticated, (req, res) => {
  // Assignment.find({}, (err, assignments) => {
  //   if (err) throw err;
  //   res.render("layout", {
  //     assignments
  //   });
  // });
  Student.findById(req.user._id, (err, user) => {
    Assignment.find({ studentId: user._id }, (err, assignments) => {
      if (err) throw err;
      res.render("layout", {
        assignments
      });
    });
  });
});

router.post("/submit", async (req, res) => {
  const { body, subject, dueDate } = req.body;
  const newAssignment = await new Assignment({
    body,
    subject,
    dueDate,
    studentId: req.user._id
  });
  newAssignment.save().then(() => {
    Student.findById(req.user._id, async (err, user) => {
      await user.assignments.push(newAssignment);
      await user.save();
      res.redirect("/");
    });
  });
});

// Delete route

router.get("/cancel/:id", (req, res) => {
  Assignment.findByIdAndDelete(req.params.id, (err, deleted) => {
    if (err) res.redirect("/");
    if (deleted) {
      console.log("assignment deleted");
      res.redirect("/");
    }
  });
});

router.get("/complete/:id", (req, res) => {
  const newComplete = new Complete({
    comp: req.params.id
  });

  newComplete.save().then(() => {
    console.log("saved completed assignment");
    Assignment.findOneAndDelete(
      {
        body: req.params.id
      },
      (err, deleted) => {
        if (err) res.redirect("/");
        if (deleted) {
          console.log("assignment deleted");
          res.redirect("/");
        }
      }
    );
  });
});

// Student routes

router.post("/student/register", (req, res, next) => {
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/student/signin-signup",
    failureFlash: true
  })(req, res, next);
});

router.post("/student/signin", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/student/signin-signup",
    failureFlash: true
  })(req, res, next);
});

router.get("/student/signin-signup", (req, res, next) => {
  res.render("sign-in-sign-up");
});

// logout student
router.get("/student/logout", (req, res, next) => {
  req.logout();
  res.redirect("/student/signin-signup");
});

module.exports = router;
