const router = require('express').Router();
const Item = require('../models/items.model');

router.route('/add').post(isAuthenticated, async (req,res) => {
    const {itemName, price, fields, order, carousel, featured} = req.body
    
    const newItem = new Item({
        itemName,
        price,
        fields,
        // imgURL,
        order,
        carousel,
        featured
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