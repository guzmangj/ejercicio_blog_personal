const { passport } = require("../config/passport");

async function login(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: {
      type: "failureFlash",
      message: "todo mal, no te tengo en la DB",
    },
    successFlash: {
      type: "successFlash",
      message: "bien loggeado ahí!",
    },
  })(req, res);
}

async function showLogin(req, res) {
  res.render("userLogin");
}

async function logout(req, res) {
  req.logout(function (error) {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
}

// async function googleLogin(req, res, next) {
//   passport.authenticate("google", { scope: ["email", "profile"] });
// }

// async function googleCallback(req, res, next) {
//   passport.authenticate("google", {
//     successRedirect: "/auth/google/success",
//     failureRedirect: "/auth/google/failure",
//   })(req, res);
// }

module.exports = {
  login,
  showLogin,
  logout,
  // googleCallback,
  // googleLogin,
};
