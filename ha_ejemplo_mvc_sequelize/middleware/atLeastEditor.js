const { Article, User } = require("../models");

async function isAtlLeastEditor(req, res, next) {
  if (req.user.roleId >= 300) {
    const articles = await Article.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "firstname", "lastname"],
        },
      ],
    });
    const users = await User.findAll();
    req.user.articles = articles;
    req.user.users = users;
    console.log("Entro un editor");
    next();
  } else {
    return next();
  }
}

module.exports = isAtlLeastEditor;
