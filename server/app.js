// imports
require('../server/config/config')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const userRoute = require('./routes/usersRoute');
const login = require('./routes/login');
const upload = require('./routes/upload');
const imagesRoute = require('./routes/imagesRoute');
const categoriesRoute = require('./routes/categoriesRoute');
const mongoose = require('mongoose');
const cors = require('cors');

// variables
const port = process.env.PORT;
const app = express()


// connect BD
mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;

    console.log('BD ONLINE');

});

// static files
app.use(express.static(path.resolve(__dirname ,'../public')));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// use cors
app.use(cors({origin: true, credentials: true}));

// routes
app.use(userRoute);
app.use(login);
app.use(upload);
app.use(imagesRoute);
app.use(categoriesRoute);

// static files
app.use(express.static(path.resolve(__dirname ,'../public')));


// run server
app.listen(port, () => console.log(`App listening on port port ${port}`))