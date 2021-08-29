const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./Routes/exercises')
const itemsRouter = require('./Routes/items')
const usersRouter = require('./Routes/users')
const adminRouter = require('./Routes/admin')
const passport = require('passport');
const session = require('express-session')
const multer  = require('multer')
const path = require('path');

//Initializations
require('dotenv').config();
const app = express();
require('./passport/local-auth')
const port = process.env.PORT || 5000;

const CORSwhiteList = ['http://admin.localhost:3000', 'http://localhost:3000']

const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    let isDomainAllowed = CORSwhiteList.indexOf(req.header('Origin')) !== -1;
    if (isDomainAllowed) {
        // Enable CORS for this request
        corsOptions = { origin: true, credentials: true }
    } else {
        // Disable CORS for this request
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

// middlewares
// app.use(cors(corsOptionsDelegate));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(session({
    secret: process.env.PASSPORT_SESSION,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

//Multer upload function

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

app.post('/images/upload', uploadFolder.array('images', 8), function (req, res, next) {
    // req.files is array of `images` files
    // req.body will contain the text fields, if there were any
    res.statusMessage = "test";
    res.end();
})


const uri = process.env.ATLAS_URI

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})