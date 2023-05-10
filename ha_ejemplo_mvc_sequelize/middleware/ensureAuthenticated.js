function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.redirectTo = req.query.redirectTo;
    res.redirect("/usuarios/login");
  }
}

module.exports = ensureAuthenticated;
