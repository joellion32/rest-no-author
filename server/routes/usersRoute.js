const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {VerifyToken} = require('../middlewares/authentication');
const app = express();


// view users
app.get('/users/all', (req, res) => {
let page = req.query.page || 0;
page = Number(page);

User.find({status: true}, 'name email image status')
.skip(page)
.limit(5)
.exec((err, UserDB) => {
if(err){
 return res.status(400).json({
    ok: false,
    err
 });   
}else{
 res.json({
    ok: true,
    users: UserDB
 });   
}
});
})


// view user by id
app.get('/users/view/:id', (req, res) => {
let id = req.params.id;
User.findById(id)
.exec((err, UserDB) => {
if(!UserDB){
return res.status(500).json({
ok: false,
message: 'user not exist'
});    
}else{
 res.json({
  ok: true,
  user: UserDB   
 })   
}
});
});


// route register users 
app.post('/users/register', (req, res) => {
let body = req.body;

let user = new User({
name: body.name,
email: body.email,
password: bcrypt.hashSync(body.password, 10),
role: body.role,
status: true,
});

// save user
user.save((err, userDB) => {
if(err){
return res.status(500).json({
ok: false,
err
});   
}else{
res.json({
ok: true,
user: userDB
});    
}
});
});


//update user
app.put('/users/update/:id', [VerifyToken] ,(req, res) => {
let id = req.params.id;
let body = req.body;
User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, UserDB) => {
if(!UserDB){
return res.status(500).json({
ok: false,
err,
message: 'user not exists'
});    
}else{
res.json({
ok: true,
user: UserDB,
message: 'user update successful'
});    
}
});
});


// delete users
app.delete('/users/delete/:id', [VerifyToken] ,(req, res) => {
let id = req.params.id;
let ChangeStatus = {
status: false    
}

// delete user 
User.findByIdAndUpdate(id, ChangeStatus, {new: true}, (err, UserDB) => {
if(!UserDB){
return res.status(400).json({
ok: false,
message: 'user not valid'
});    
}else{
res.json({
ok: true,
status: ChangeStatus,
message: 'user delete successful'
})        
}
});

});

module.exports = app;