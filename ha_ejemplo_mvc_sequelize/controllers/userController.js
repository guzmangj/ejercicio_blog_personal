const { User, Role } = require("../models");
const bcrypt = require("bcryptjs");

// Display a listing of the resource.
async function index(req, res) {
  const users = await User.findAll({
    include: [
      {
        model: Role,
        attributes: ["id", "role"],
      },
    ],
  });

  res.render("userList", {
    users,
  });
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {
  return res.render("userRegister");
}

// Store a newly created resource in storage.
async function store(req, res) {
  const [user, created] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: await bcrypt.hash(req.body.password, 5),
    },
  });
  if (created) {
    req.login(user, () => {
      req.flash("success", "User created succesfully");
      res.redirect("/panel");
    });
  } else {
    req.flash("info", "User already exists, please log in");
    res.redirect("/login");
  }
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const user = await User.findByPk(req.params.id);
  const roles = await Role.findAll();
  return res.render("userEdit", { roles, user });
}

// Update the specified resource in storage.
async function update(req, res) {
  const editUser = await User.update(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      role: req.body.role,
    },
    {
      where: { id: req.params.id },
    },
  );
  return res.redirect("/usuarios");
}

async function createUser(req, res) {
  const users = await User.findAll();
  const roles = await Role.findAll();
  return res.render("userEdit", { users, roles });
}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  createUser,
};
