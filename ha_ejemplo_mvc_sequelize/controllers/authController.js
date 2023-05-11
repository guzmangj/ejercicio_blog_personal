const {passport} = require("../config/passport");

async function login(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/panel",
    failureRedirect: "/usuarios/login",
    failureFlash: {
      type: "failureFlash",
      message: "todo mal, no te tengo en la DB"
    },
    successFlash: {
      type: "successFlash",
      message: "bien loggeado ahí!"
    }
  })(req, res);
}

module.exports = {
  login
};
