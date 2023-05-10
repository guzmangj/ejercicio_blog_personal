require("dotenv").config();

const { User } = require("./models");

const methodOverride = require("method-override");
const express = require("express");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "Esto es Nacional desde 1899, 124 de verdura",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.session());

passport.use(new LocalStrategy(
  {
   usernameField: "email",
  },
  async function(username, password, done) { 
   try {
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      console.log("Nombre de usuario no existe.");
      return done(null, false, { message: "Credenciales incorrectas." });
    }
    const match = await bcrypt.compare(password, user.password); 
    if (!match) {
      console.log("La contraseña es inválida.");
      return done(null, false, { message: "Credenciales incorrectas." });
    }
    console.log("Credenciales verificadas correctamente");
    return done(null, user);

   }catch (error) {
    done(error);
   } 
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user); // Usuario queda disponible en req.user.
  } catch (err) {
    done(err);
  }
});

app.get("/welcome", function (req, res) {
  if (req.isAuthenticated()) {
    res.send(`Te damos la bienvenida, ${req.user.firstname}!!!`);
  } else {
    res.redirect("/login");
  }
});

app.post(
  "/usuarios/login",
  passport.authenticate("local", {
    successRedirect: "/usuarios/welcome",
    failureRedirect: "/",
    failatureFlash: true,
  }),
);

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
