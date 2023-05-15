const { Article, User } = require("../models");

async function atLeastWriter(req, res, next) {
  if (req.user.roleId >= 200) {
    const userArticles = await Article.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstname", "lastname"],
        },
      ],
    });
    const article = await Article.findByPk(req.params.id);
    req.user.articles = userArticles;
    req.user.article = article;
    console.log("Entro un escritor");
    next();
  } else {
    return res.redirect("/");
  }
}

module.exports = atLeastWriter;
