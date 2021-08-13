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

// router.route('/login').post(function(req,res){
//     //successRedirect: '/',
//     // failureRedirect: 'login',
//     //passReqToCallback: true
//     passport.authenticate('local-login', { passReqToCallback: true}, function(err) {
//         if(err) return res.json(err)
//         res.json('You\'ve been logged in!');
//     })(req,res)
// });
router.route('/login').post((req, res, next) => {

    passport.authenticate('local-login',{
        successRedirect: '/users/createUser',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
})
    // passport.authenticate('local-login', { passReqToCallback: true}, function(err) {
    //     if(err) return res.json(err)
    //     res.json('You\'ve been logged in!');
    // })(req,res)

    
// });

router.route('/createUser').post(function(req, res){
    passport.authenticate('local-signup', { passReqToCallback: true}, function(err) {
        if(err) res.json(err)
        res.json(true)
    })(req, res)
})

router.route('/logout').post((req, res) => {
    req.logout();
    res.json(true)
})
router.route('/authenticateUser').get( isAuthenticated, (req, res) => {
    console.log("user authenticated")
    res.json(true)
})

function isAuthenticated(req, res, next) {
    console.log("Trying to authenticate")
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()) return next()
    res.json(false)
}

module.exports = router;