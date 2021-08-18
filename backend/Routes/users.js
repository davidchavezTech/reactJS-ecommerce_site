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
    const {userName, password, names, title, number} = req.body
    const userData = { userName, password, names, title, number }
    const newUser = new User(userData);
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

    passport.authenticate('local-login', (err, user, info) => {
        if(err) throw err;
        if(!user) res.send('No user exists');
        else {
            req.logIn(user, err=>{
                if (err) throw err;
                res.send("successfully authenticated")
                console.log(req.user);
            })
        }
    })(req, res, next)
});
//     )(req, res, function(){
//         if(!req.user) {
//             console.log("user not found")
//         }else {
//             res.redirect("http://admin.localhost:3000/")
//             console.log(("signed in"))
//         }
//     });
// })
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
router.get('/authenticateUser', isAuthenticated, (req, res) => {
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