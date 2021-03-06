const mongoose=require("mongoose");
const bcrypt = require('bcryptjs');
SALT_WORK_FACTOR = 10;

const AddressSchema = mongoose.Schema({
    city: String,
    street: String,
    buildingNumber: String,
  });
//1- create schema (rules)
let speakerSchema=new mongoose.Schema({
    _id:{type:mongoose.Types.ObjectId, auto:true},
    email:{type:String,required:true,unique:true},
    userName:{type:String},
    password:{type:String ,required:true},
    address:{type:AddressSchema}
});

speakerSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

speakerSchema.methods.comparePassword = function(candidatePassword, functioncb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return functioncb(err);
        functioncb(null, isMatch);
    });
};
//2- register  //collection , schma
module.exports=mongoose.model("speakers",speakerSchema);