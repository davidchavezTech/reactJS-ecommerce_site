const router = require('express').Router();
const multer  = require('multer')
const Item = require('../models/items.model');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`)
    }
  })
  
const uploadFolder = multer({ storage: storage })

router.route('/add').post(uploadFolder.array('images', 8), function (req, res, next) {
    // req.files is array of `images` files
    // req.body will contain the text fields, if there were any
    console.log(req.body)

    console.log(req.files)
    if(req.files) next()
    else(res.status(400).json("error"))
}, async (req,res) => {
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