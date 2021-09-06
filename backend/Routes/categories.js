const fs = require('fs')
const router = require('express').Router();
const multer  = require('multer')
const Category = require('../models/categories.model');

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


router.route('/getCategories').get(async (req, res) =>{
    try{
        const response = await Category.find()
        res.json(response)
    }catch(err) {
        console.log(err)
        res.json("Error: " + err)
    }
})
router.route('/add').post(uploadFolder.array('images', 1), async function (req, res, next) {
    // req.files is array of `images` files
    // req.body will contain the text fields, if there were any
    const { categoryName } = req.body
    const response = await Category.findOne({categoryName})
    if(response) return res.json("Esa categoría ya existe")
    if(req.files) next()
    else(res.status(400).json("error, no files were received"))
}, async (req,res) => {

    const { categoryName } = req.body
    const imageFileName = req.files[0].filename
    
    const newCategory = new Category({
        categoryName,
        imageFileName
    });
    try {
        const response = await newCategory.save()
        res.json(response)
    }catch(err){ 
        console.log(err)
        res.status(400).json('Error: ' + err) 
    }
});

module.exports = router;