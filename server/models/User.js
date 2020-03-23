const mongoose = require('mongoose');


let Schema = mongoose.Schema;


let UserSchema = new Schema({
name: {
type: String,
required: [true, 'the name is required']    
},
email: {
type: String,
unique: true,
required: [true, 'the email is required']        
},
password: {
type: String,
required: [true, 'the password is required']        
},
role: {
type: String,
default: 'USER_ROLE',
},
image:{
type: String,
required: false,    
},
status:{
type: Boolean,
default: false
}

});

// not seed password
UserSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


module.exports = mongoose.model('User', UserSchema);