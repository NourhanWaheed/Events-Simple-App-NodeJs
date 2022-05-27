const express=require("express");
const body_parser=require("body-parser");
const mongoose=require("mongoose");
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const eventRouter=require("./Routers/eventsRouter");
const studentRouter=require("./Routers/studentsRouter");
const speakerRouter=require("./Routers/speakersRouter");
const authRouter = require("./Routers/authRouter")

const server=express();

dotenv.config();
mongoose.connect("mongodb://localhost:27017/eventDB")
        .then(()=>{
            console.log("DB connectd");
            server.listen(process.env.PORT||8080,()=>{
                console.log("I am Listening ....... ")
            });
        })
        .catch(error=>console.log("DB Connection problem"))

// Logger MW
server.use(cors({
    origin: '*'
}));

server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();
});
// body parsing middleware
server.use(body_parser.json());
server.use(body_parser.urlencoded({extended:false}));

//Routers
server.use(authRouter);
server.use(eventRouter);
server.use(studentRouter);
server.use(speakerRouter);

//Not Found MW
server.use((request,response)=>{
    response.status(404).json({meassge:"Page is Not Found"});
 });

//Error
server.use((error,request,response,next)=>{
    console.log("eerorr")
    response.status(500).json({meassge:error+""});
});