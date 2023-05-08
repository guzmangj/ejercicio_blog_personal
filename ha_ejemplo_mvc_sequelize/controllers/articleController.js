const { Article, Comment, User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  const articles = await Article.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ["id", "firstname", "lastname"],
      },
    ],
  });
  const comments = await Comment.findAll({
    where: { articleId: req.params.id },
  });
  res.render("article", { articles, comments });
}

// Show the form for creating a new resource
async function create(req, res) {
  const users = await User.findAll();
  res.render("createArticle", { users });
}

// Store a newly created resource in storage.
async function store(req, res) {
  const newArticle = await Article.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  });
  res.redirect("/panel");
}

async function newComment(req, res) {
  const { newName, newContent } = req.body;
  const newComment = await Comment.create({
    content: newContent,
    name: newName,
    articleId: req.params.id,
  });
  res.redirect(`/articulos/${req.params.id}`);
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const articles = await Article.findByPk(req.params.id);
  const users = await User.findAll();
  res.render("editArticle", { articles, users });
}

// Update the specified resource in storage.
async function update(req, res) {
  const editArticle = await Article.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: { id: req.params.id },
    },
  );
  res.redirect("/panel");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const deleteArticle = await Article.destroy(req.params.id);
  res.redirect("/panel");
}

// POST comment
async function newComment(req, res) {
  const { newName, newContent } = req.body;
  const newComment = await Comment.create({
    content: newContent,
    name: newName,
    articleId: req.params.id,
  });
  res.redirect(`/articulos/${req.params.id}`);
}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  newComment,
};
