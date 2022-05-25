const mongoose=require("mongoose");

//1- create schema (rules) //plugins 
let eventSchema=new mongoose.Schema({
    _id:Number,
    title:{type:String, required:true},
    eventDate:{type:Date},
    mainSpeaker:{type:mongoose.Types.ObjectId,ref:"speakers" },
    otherSpeakers:[{type:mongoose.Types.ObjectId,ref:"speakers"}],
    studentIds:[{type:Number,ref:"students"}]
});

//2- register  //collection , schma
module.exports=mongoose.model("events",eventSchema)