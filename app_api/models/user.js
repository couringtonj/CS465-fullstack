const mongoose=require('mongoose');
const crypto=require('crypto');
const jwt=require('jsonwebtoken');
const { stringify } = require('querystring');

const userSchema=new mongoose.Schema({
    email:{
        type:string,
        requires:true,
        unique:true
    },
    name:{
        type:string,
        required:true
    },
    hash:String,
    salt:String

});

userSchema.methods.setPassword=function(password){
    this.salt=crypto.randomBytes(16).toString('hex'),
    this.hash=crypto.pbkdf2Sync(password, this.salt, 1000, 64,'sha512').toString('hex');
};

userSchema.methods.validPassword=function(password){
    var hash=crypto.pbkdf2Sync(password, this.salt, 1000, 64,'sha512').toString('hex');
    return this.hash===hash;
};

userSchema.methods.generateJwt=function(){
    const expiry=new Date();
    expiry.setDate(expiry.getDate()+7);
    return jwt.sign({
        _id:this._id,
        email:this.email,
        name:this.name,
        exp:parseInt(expiry.getTime()/1000,10);

    }, process.env.JWT_SECRET);//do not keep your secret in the code
};
mongoose.model('users',userSchema);
