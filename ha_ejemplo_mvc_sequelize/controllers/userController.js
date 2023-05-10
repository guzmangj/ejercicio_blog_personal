const { User } = require("../models");
const express = require("express");

const app = express();
const flash = require("express-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");

// Display a listing of the resource.
async function index(req, res) {
  res.render("userLogin");
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {
  res.render("userRegister");
}

// Store a newly created resource in storage.
async function store(req, res) {
  const [user, created] = await User.findOrCreate({
    // Ver opciones en Sequelize.
  });
  if (created) {
    req.login(user, () => res.redirect("/admin"));
  } else {
    res.redirect("back");
  }
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// async function login() {
//   passport.authenticate("local", {
//     successRedirect: "/welcome",
//     failureRedirect: "/login",
//   });
// }

async function showWelcome(req, res) {
  res.render("userWelcome");
}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  showWelcome,
  destroy,
  // login,
};
