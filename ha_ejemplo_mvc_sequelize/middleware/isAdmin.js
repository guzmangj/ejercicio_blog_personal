const { Article, User, Role } = require("../models");

async function isAdmin(req, res, next) {
  if (req.user.roleId >= 400) {
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
    console.log("Entro un admin");
    next();
  } else {
    return next();
  }
}

module.exports = isAdmin;
