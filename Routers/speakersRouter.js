const express=require("express");
const {body,param,query}=require("express-validator");
///const authMW=require("./../MiddleWares/authMiddleWare");
const router=express.Router();
const controller=require("../Controllers/speakersController")

//router.use(authMW);

router.route("/speakers")
.get(controller.getAllSpeakers)
.post( /*authMW,*/
        [
            body("email").isEmail().withMessage("email should be string"),
            body("password").isStrongPassword().withMessage("Password is weak"),
            body("userName").isAlphanumeric().withMessage("userName should be string and numbers")
            .isLength({max:10}).withMessage("name length<10")
        ],
    controller.createSpeaker)
.put(
    [
        body("email").isEmail().withMessage("email should be string"),
        body("password").isStrongPassword().withMessage("Password is weak"),
        body("userName").isAlphanumeric().withMessage("userName should be string and numbers")
        .isLength({max:10}).withMessage("name length<10")
    ],
    controller.updateSpeaker)
.delete(controller.deleteSpeaker)

router.get("/speakers/:id",controller.getSpeaker)
module.exports=router;