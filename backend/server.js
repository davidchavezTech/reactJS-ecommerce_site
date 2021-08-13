const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./Routes/exercises')
const itemsRouter = require('./Routes/items')
const usersRouter = require('./Routes/users')
const passport = require('passport');
const session = require('express-session')

//Initializations
require('dotenv').config();
const app = express();
require('./passport/local-auth')
const port = process.env.PORT || 5000;

const CORSwhiteList = ['http://admin.localhost:3000']

const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    let isDomainAllowed = CORSwhiteList.indexOf(req.header('Origin')) !== -1;

    if (isDomainAllowed) {
        // Enable CORS for this request
        corsOptions = { origin: true }
    } else {
        // Disable CORS for this request
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

// middlewares
app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(session({
    secret: process.env.PASSPORT_SESSION,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

const uri = process.env.ATLAS_URI

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})