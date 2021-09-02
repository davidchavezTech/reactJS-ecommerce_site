const fs = require('fs')
const router = require('express').Router();
const multer  = require('multer')
const Item = require('../models/items.model');
const path = require('path');
const { maxImagesNumber } = require("../globalVariables")
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

router.route('/add').post(uploadFolder.array('images', maxImagesNumber), function (req, res, next) {
    // req.files is array of `images` files
    // req.body will contain the text fields, if there were any
    if(req.files) next()
    else(res.status(400).json("error, no files were received"))
}, async (req,res) => {
    const {itemName, description, mUnit } = req.body
    let { priceAndUnits, options } = req.body

    priceAndUnits = JSON.parse(priceAndUnits)
    options = JSON.parse(options)

    const imagesFileNames = []
    
    //Store the images names in imagesURLs
    for(let i = 0; req.files.length > i; i++ ) imagesFileNames.push(req.files[i].filename)

    const newItem = new Item({
        itemName,
        description,
        priceAndUnits: priceAndUnits,
        mUnit,
        options: options,
        imagesFileNames,
        // order,
        // carousel,
        // featured
    });
    try {
        const response = await newItem.save()
        res.json(response)
    }catch(err){ 
        console.log(err)
        res.status(400).json('Error: ' + err) 
    }
});

router.route('/').get( async (req, res) =>{
    try{
        const items = await Item.find()
        res.json(items)
    }catch(err) { res.status(400).json('Error: ' + err) }
    
});

router.route('/:itemId').get( async (req, res) =>{
    try{
        const response = await Item.findOne({_id: req.params.itemId})
        res.json(response)
    }catch(err) {
        console.log(err)
        res.json("Error: " + err)
    }
});


router.route('/edit').post(uploadFolder.array('images', maxImagesNumber), async (req, res) =>{
    try{
        const { _id, itemName, description, mUnit } = req.body

        //parse arrays and objects recieved
        
        console.log(req.body)

        let priceAndUnits = JSON.parse(req.body.priceAndUnits)
	    let options = JSON.parse(req.body.options)
	    let imageURLsToKeep = JSON.parse(req.body.imageURLsToKeep)
	    let imageURLsToDelete = JSON.parse(req.body.imageURLsToDelete)
        
        // remove images selected for deletion from server
        for(const fileName of imageURLsToDelete){
            const path = `./public/uploads/${fileName}`
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        }
        // update db with new image file names
        const newImageFileNames = [...imageURLsToKeep]
        console.log(newImageFileNames)
        for(const { filename } of req.files) newImageFileNames.push(filename)
        
        const response = await Item.updateOne({ _id },  { 
            $set: { 
                itemName,
                priceAndUnits,
                description,
                mUnit,
                options,
                imagesFileNames: imageURLsToKeep
            }
        });
        console.log(response)

        res.json(req.body)
    }catch(err) {
        console.log(err)
        res.json("Error: " + err)
    }
});

function isAuthenticated(req, res, next) { return req.isAuthenticated() ? next() : res.json(false) }

module.exports = router;