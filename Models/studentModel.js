const mongoose=require("mongoose");

//1- create schema (rules)
let studentSchema=new mongoose.Schema({
    _id:Number,
    email:{type:String,required:true,unique:true},
    password:{type:String}
});

//2- register  //collection , schma
module.exports=mongoose.model("students",studentSchema)