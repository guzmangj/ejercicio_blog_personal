const {passport} = require("../config/passport");

async function login(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/panel/welcome",
    failureRedirect: "/usuarios/login",
  })(req, res, next);
}

module.exports = {
  login
};
