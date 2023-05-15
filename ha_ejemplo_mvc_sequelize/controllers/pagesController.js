/**
 * Este archivo se utiliza en un proyecto donde se está utlizando server-side
 * rendering (ej: con un motor de templates como EJS). Tiene como objetivo
 * mostrar (renderear) páginas que no están directamente relacionandas con
 * una entidad del proyecto.
 *
 * Ejemplos:
 *   - Página de inicio (Home).
 *   - Página de contacto.
 *   - Página con política de privacidad.
 *   - Página con términos y condiciones.
 *   - Página con preguntas frecuentes (FAQ).
 *   - Etc.
 *
 * En caso de estar creando una API, este controlador carece de sentido y
 * no debería existir.
 */

const { Article, Comment, User, Role } = require("../models");
const { format } = require("date-fns");
const bcrypt = require("bcryptjs");
const { es } = require("date-fns/locale");

async function showHome(req, res) {
  const articles = await Article.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "firstname", "lastname"],
      },
    ],
  });

  res.render("home", { articles, format, es });
}

async function showPanel(req, res) {
  const user = req.user;
  const userArticles = await Article.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "firstname", "lastname"],
      },
    ],
  });
  res.render("admin", {
    userArticles,
    user,
    format,
    es,
  });
}

async function userCreate(req, res) {
  const roles = await Role.findAll();
  return res.render("userCreate", { roles });
}

async function userStore(req, res) {
  const [user, created] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: await bcrypt.hash(req.body.password, 5),
      roleId: req.body.roleId,
    },
  });
  if (created) {
    req.flash("success", "User created succesfully");
    res.redirect("/usuarios");
  } else {
    req.flash("info", "User already exists");
    res.redirect("/usuarios");
  }
}

async function userDelete(req, res) {
  await Article.destroy({
    where: {
      userId: req.params.id,
    },
  });
  await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect("/usuarios");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showPanel,
  showAboutUs,
  userCreate,
  userStore,
  userDelete,
};
