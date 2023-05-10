const { User } = require("../models");
const bcrypt = require("bcryptjs");



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
    where: { email: req.body.email },
    defaults:{
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: await bcrypt.hash(req.body.password, 5)
    }
  });
  if (created) {

    req.flash('info', 'Se ha creado un usuario');
    
    req.login(user, () => res.redirect("/panel"));
  } else {
    req.flash('info', 'El usuario existe, no sea nabo vaya a loggearse');
    res.redirect("/usuarios/login");
  }
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...

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
};
