function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.redirectTo = req.query.redirectTo //req.headers.refer
    res.redirect("/login");
  }
}

module.exports = ensureAuthenticated;
