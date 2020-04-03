const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const app = express();


app.post('/login', (req, res) => {
let body = req.body;
User.findOne({email: body.email}, (err, UserDB) => {
if(err){
return res.status(500).json({
ok: false,
err
});    
}
if(!UserDB){
return res.status(400).json({
ok: false,
message: 'the email and password are incorrect'
});    
}

// for the password
if(!bcrypt.compareSync(body.password, UserDB.password)){
return res.status(400).json({
ok: false,
message: 'the email and password are incorrect'
});    
}

// generate token
let token = jwt.sign({
    user:  UserDB
}, process.env.SEED, { expiresIn: process.env.EXP});

// all the right process
res.json({
ok: true,
user: UserDB,
token: token
});

}); // end function
}); // end request


module.exports = app;