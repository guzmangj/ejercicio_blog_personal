require("dotenv").config();

const methodOverride = require("method-override");
const express = require("express");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();
const session = require("express-session");
const { passportConfig, passport } = require("./config/passport");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const flashMessages = require("connect-flash");
const makeUserAvailableInViews = require("./middleware/makeUserAvailableInViews");
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);
app.use(flash());
app.set("view engine", "ejs");
app.use(flashMessages());
app.use(passport.session());
passportConfig();

app.use(makeUserAvailableInViews);

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
