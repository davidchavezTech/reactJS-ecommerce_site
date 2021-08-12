const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./Routes/exercises')
const itemsRouter = require('./Routes/items')
const usersRouter = require('./Routes/users')

require('dotenv').config();
console.log(process.env.ATLAS_URI)
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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