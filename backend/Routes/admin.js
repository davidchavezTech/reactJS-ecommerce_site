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
                res.json(true)
            })
        }
    })(req, res, next)
});

//Find users
router.route('/getUsers').get(isAuthenticated, async (req, res) =>{
    try {
        let users = await User.find()
        let usersCopy = JSON.parse(JSON.stringify(users))
        for(user of usersCopy) delete user.password;
        res.json(usersCopy)
    }
    catch(err){
        res.status(400).json('Error: ' + err)
        }
});
router.route('/createUser').post(isAuthenticated, function(req, res){
    passport.authenticate('local-signup', { passReqToCallback: true}, function(err) {
        if(err) res.json(err)
        res.json(true)
    })(req, res)
})

router.route('/delete/:id').delete(isAuthenticated, (req, res) =>{
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Admin deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/addAdmin').post(isAuthenticated, async (req,res) => {
    const {userName, password, names, title, number} = req.body
    const foundUser = await User.findOne({userName})
    if(foundUser != null) return res.json("Usuario ya existe")
    const userData = { userName, names, title, number }
    const newUser = new User(userData);
    newUser.password = newUser.encryptPassword(password);
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) return next(err)
        req.logout()
        res.sendStatus(200)
    })
})
router.get('/authenticateUser', isAuthenticated, (req, res) => res.json(true) )

function isAuthenticated(req, res, next) { return req.isAuthenticated() ? next() : res.json(false) }

module.exports = router;