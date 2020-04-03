const express = require('express')
const mongoose =  require('mongoose');
const app = express()

let Schema = mongoose.Schema;

let categoryShema = new Schema({
description: {
type: String,
required: true,    
},
});



module.exports = mongoose.model('Category', categoryShema);
