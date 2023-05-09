const { User } = require("../models");
const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();

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
  const hashPassword = req.body.password;
  const hashedPassword = await bcrypt.hash(hashPassword, 10);
  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
  });
  res.redirect("/usuarios/login");
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
async function login(req, res) {
  const user = await User.findAll({ where: { email: req.body.email } });
  const inputPassword = req.body.password;
  const storedHash = user.password;

  const passwordCheck = bcrypt.compare(inputPassword, storedHash);
  if (passwordCheck) {
    res.redirect("/welcome");
  } else {
    res.redirect("/login");
  }
}

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
  login,
};
