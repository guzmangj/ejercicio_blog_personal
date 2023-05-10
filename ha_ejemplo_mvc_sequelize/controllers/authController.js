const passport = require("../config/passport");

function login(req, res) {
  passport.authenticate("local", {
    successRedirect: "/usuarios/welcome",
    failureRedirect: "/usuarios/login",
  })(req, res);
}

module.exports = {
  login,
};
