const moongose = require('mongoose');


let Schema = moongose.Schema;

let ImageSchema = new Schema({
title: {
type: String,
required: [true, 'the title is required'],    
},
image: {
type: String,
required: false    
},
date: {
type: Date,
default: new Date().getDate()    
},
user: {
type: Schema.Types.ObjectId, ref: 'User'   
}
});


module.exports = moongose.model('Image', ImageSchema);