const { Article, Comment, User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  const articles = await Article.findByPk(
    req.params.id,
    { include: [{ model: Comment, attributes: ["id", "name", "content", "createdAt"] }] },
    { include: [{ model: User, attributes: ["id", "firstname", "lastname"] }] },
  );
  res.render("article", { articles });
}

// Show the form for creating a new resource
async function create(req, res) {
  res.render("createArticle");
}

// Store a newly created resource in storage.
async function store(req, res) {
  const newArticle = await Article.create({
    title: req.body.title,
    content: req.body.content,
  });
  res.redirect("/panel");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const articles = await Article.findByPk(req.params.id);
  res.render("editArticle", { articles });
}

// Update the specified resource in storage.
async function update(req, res) {
  const editArticle = await Article.update({
    title: req.body.title,
    content: req.body.content,
  });
  res.redirect("/panel");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const deleteArticle = await Article.destroy(req.params.id);
  res.redirect("/panel");
}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
