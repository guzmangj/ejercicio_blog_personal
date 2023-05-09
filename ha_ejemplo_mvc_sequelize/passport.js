const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

app.use(
    session({
        secret: "Esto es Nacional desde 1899, 124 de verdura",
        resave: false,
        saveUninitialized:false,
    })
)

passport.use()

app.use(passport.session(
    new LocalStrategy(async function (username, password, done){
        try{
            // Buscar en la Base de datos
            const user = await User.findOne({ where: {email: useremail}, where: {password: password} });
            if(!username){
                done(null, false, {message: "Usuario y/o Password incorrectos"})
            }else if(!password){
                done(null, false, {message: "Usuario y/o Password incorrectos"})
            }else{
                return done(null, user)
            }

        }catch (error){
            return done(error)
        }
    })
));

passport.serializeUser(function (user, done){
    done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
    try{
        const user = await User.findByPk(id);
    }catch(error){
        done(error)
    }
})

app.get("/welcome", function(req, res) {
    if(req.isAuthenticated()) {
        res.send(`Te damos la bienvenida, ${req.user.firstname}!!!`)
    }else {
        res.redirect("/login");
    }
})

app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/welcome",
        failureRedirect: "/login"
    })
);