const { User } = require("../models");

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
  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  res.redirect("/login");
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
async function login(req, res) {
  res.send("tamos en el login");
}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  login,
};
