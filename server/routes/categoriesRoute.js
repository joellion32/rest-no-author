const express = require('express');
const Category = require('../models/Category');
const Image = require('../models/Images');
const {VerifyToken, Verify_Admin_Role} =  require('../middlewares/authentication')
const app = express();


// view all categories
app.get('/categories', (req, res) => {
Category.find({})
.exec((err, categoryDB) => {
if(!categoryDB || err){
return res.status(400).json({
ok: false,
err: err,
message: 'Category no exist'
});
}else{
res.json({
ok: true,
categories: categoryDB    
})    
}
});

}); // end request


// find categories by id and images
app.get('/category/:id', (req, res) => {
let id = req.params.id;

// search images
Image.find({category_id: id})
.exec((err, ImageDB) => {
Category.findById(id, (err, categoryDB) => {
if(!categoryDB || err){
return res.status(400).json({
ok: false,
error: err,
message: 'Category not exist'
});    
}
res.json({
ok: true,
category: categoryDB,
images: ImageDB
});  
});
});
}); // end request 



// save categories
app.post('/categories/save', [VerifyToken, Verify_Admin_Role] ,(req, res) => {
let body = req.body;

let category = new Category({
description: body.description
});

//save category
category.save((err, categoryDB) => {
if(err){
return res.status(500).json({
ok: false,
error: err
});    
}
res.json({
ok: true,
category: categoryDB,
message: 'category saved correctly'
});
});

}); // en request

module.exports = app;