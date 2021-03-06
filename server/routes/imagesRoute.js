const express = require('express');
const Image = require('../models/Images')
const path = require('path');
const fs = require('fs');
const {VerifyToken} = require('../middlewares/authentication')
const app = express();

// view all images
app.get('/images', (req, res) => {
let page = req.query.page || 0;
page = Number(page);

Image.find({})
.populate('user', 'name')
.skip(page)
.limit(20)
.exec((err, ImageDB) => {
if(err){
return res.status(500).json({
ok: false,
err
});    
}else{
 res.json({
  ok: true,
  images: ImageDB   
 })   
}
});
});

// search images
app.get('/search/images/:finished',(req, res) => {
let finished =  req.params.finished;
let page = req.query.page || 0;
page = Number(page);

// search for word
let regex = new RegExp(finished, 'i');

Image.find({title: regex})
.skip(page)
.limit(10)
.populate('user', 'name')
.exec((err, ImageDB) => {
if(err){
return res.status(500).json({
ok: true,
err
});   
}

if(!ImageDB){
return res.status(400).json({
ok: false,
message: 'Image not found'
});   
}

res.json({
ok: true,
images: ImageDB
});
});
});


// get image by id
app.get('/images/:id', [VerifyToken], (req, res) => {
let id = req.params.id;
Image.findById(id)
.populate('user', 'name')
.exec((err, ImageDB) => {
if(err){
return res.status(500).json({
ok: false,
err
});    
}

if(!ImageDB){
return res.status(400).json({
ok: false,
message: 'Image not exist'
});    
}

res.json({
ok: true,
image: ImageDB
});
});
});

// saves images
app.post('/images/save', [VerifyToken] ,(req, res) => {
body = req.body;
let image = new Image({
user: req.user._id,
title: body.title,
category_id: body.category_id,
date: new Date().getDate()
});

image.save((err, ImageDB) => {
if(err){
return res.status(500).json({
ok: false,
err
});    
}else{
res.json({
ok: true,
image: ImageDB    
})    
}
});
});

// delete images
app.delete('/images/:id', [VerifyToken] ,(req, res) => {
let id = req.params.id;
Image.findById(id, (err, ImageDB) => {
if(!ImageDB){
return res.status(400).json({
ok: false,
message: 'Image not exists'
});    
}

// deleted image dirname public
let imagepath = path.resolve(__dirname, `../../public/uploads/${ImageDB.image}`);
console.log(imagepath);

if(fs.existsSync(imagepath)){
   fs.unlinkSync(imagepath); 
}

Image.findByIdAndDelete(id, (err, response) => {
if(err){
return res.status(500).json({
ok: false,
err
});    
}else{
res.json({
ok: true,
message: 'Image deleted successful'
});    
}
});
});
})



module.exports = app;