const {passport} = require("../config/passport");

async function login(req, res) {
  passport.authenticate("local", {
    successRedirect: "/panel/welcome",
    failureRedirect: "/usuarios/login",
  })(req, res);
}

module.exports = {
  login
};
