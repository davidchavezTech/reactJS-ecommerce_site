const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) =>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post(
    //successRedirect: '/',
    // failureRedirect: 'login',
    //passReqToCallback: true
    passport.authenticate('local-login', { passReqToCallback: true}),
    function(req, res) {
        res.json('You\'ve been logged in!');
});

router.route('/createUser').post(
    passport.authenticate('local-signup', { passReqToCallback: true}),
    function(req, res) {
        res.json("User Created successfully")
    }
)

module.exports = router;