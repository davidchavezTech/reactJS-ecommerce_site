const router = require('express').Router();
const Item = require('../models/items.model');

router.route('/add').post(async (req,res) => {
    const {itemName, imgURL, description, price} = req.body
    
    const newItem = new Item({
        itemName,
        imgURL,
        description,
        price
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

module.exports = router;