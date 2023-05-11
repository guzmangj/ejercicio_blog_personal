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

const { Article, Comment, User } = require("../models");
const {format } = require("date-fns");
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

  res.render("home", { articles });
}

async function showPanel(req, res) {
  const articles = await Article.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "firstname", "lastname"],
      },
    ],
  });
  const user = req.user;
  const userArticles = await Article.findAll({
    where:{
      userId: user.id
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstname", "lastname"],
      },
    ],
  })
  res.render("admin", { 
    userArticles,
    user,
    format,
    es
   });
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
};
