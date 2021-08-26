const router = require('express').Router();
const Item = require('../models/items.model');

router.route('/add').post(async (req,res) => {
    const {itemName, priceAndUnits, description, options} = req.body
    
    const newItem = new Item({
        itemName,
        priceAndUnits: JSON.stringify(priceAndUnits),
        description,
        options: JSON.stringify(options),
        // imgURL,
        // order,
        // carousel,
        // featured
    });
    try {
        await newItem.save()
        res.json('Item added!')
    }catch(err){ res.status(400).json('Error: ' + err) }
});

router.route('/').get((req, res) =>{
    Item.find()
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
});

function isAuthenticated(req, res, next) { return req.isAuthenticated() ? next() : res.json(false) }

module.exports = router;