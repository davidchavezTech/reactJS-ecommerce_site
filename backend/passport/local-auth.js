const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
let User = require('../models/user.model');

passport.serializeUser((user, done) => {
    console.log(user)
    console.log("serializing...")
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    await User.findById(id)
})

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
        const user = await User.findOne({userName: email})
        if(!user) return done("Wrong credentials!", false)
        if(!user.comparePassword(password)) return done("Wrong credentials!", false)
        done(null, user)
}))

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const foundUser = await User.findOne({userName: email})
    if(foundUser) return done("User already exists", false)
    const newUser = new User();
    newUser.userName = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.names = req.body.names
    await newUser.save();   
    done(null, newUser);
}))