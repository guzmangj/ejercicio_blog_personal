const {passport} = require("../config/passport");

async function login(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/panel",
    failureRedirect: "/usuarios/login",
  })(req, res);
}

module.exports = {
  login
};
