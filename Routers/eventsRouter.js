const express=require("express");
//const {body,param,query}=require("express-validator");
///const authMW=require("./../MiddleWares/authMiddleWare");
const router=express.Router();
const controller=require("../Controllers/eventsController")

//router.use(authMW);

router.route("/events")
.get(controller.getAllEvents)
.post( /*authMW,*/
       /* [
            body("id").isInt().withMessage("id should be intger"),
            body("name").isAlpha().withMessage("name should be string")
            .isLength({max:10}).withMessage("department name length<10")
        ]*/
    controller.createEvent)
.put(controller.updateEvent)
.delete(controller.deleteEvent)

router.get("/events/:id",controller.getEvent)
module.exports=router;