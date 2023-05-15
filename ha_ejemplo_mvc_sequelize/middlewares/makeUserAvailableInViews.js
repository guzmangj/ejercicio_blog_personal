function makeUserAvailableInViews(req, res, next) {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  return next();
}
module.exports = makeUserAvailableInViews;