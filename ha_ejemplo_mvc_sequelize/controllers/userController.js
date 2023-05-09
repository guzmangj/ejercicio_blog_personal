const { User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  res.send("desde el index de usuarios")
}
// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

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
  login
};
