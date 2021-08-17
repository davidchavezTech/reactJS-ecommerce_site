const passport = require('passport');
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/login').post((req, res, next) => {

    passport.authenticate('local-login', (err, user, info) => {
        if(err) throw err;
        if(!user) res.send('No user exists');
        else {
            req.logIn(user, err=>{
                if (err) throw err;
                console.log(req.user);
                res.json(true)
            })
        }
    })(req, res, next)
});

router.route('/createUser').post(function(req, res){
    passport.authenticate('local-signup', { passReqToCallback: true}, function(err) {
        if(err) res.json(err)
        res.json(true)
    })(req, res)
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) return next(err)
    
        req.logout()
    
        res.sendStatus(200)
    })
})
router.get('/authenticateUser', isAuthenticated, (req, res) => {
    res.json(true)
})

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.json(false)
}

module.exports = router;