const express = require("express");
const { body, param, query } = require("express-validator");
///const authMW=require("./../MiddleWares/authMiddleWare");
const router = express.Router();
const controller = require("../Controllers/studentsController")

//router.use(authMW);

router.route("/students")
    .get(controller.getAllStudents)
    .post( /*authMW,*/
        [
            body("id").isInt().withMessage("id should be intger"),
            body("email").isEmail().withMessage("email should be string"),
            body("password").isStrongPassword().withMessage("Password is weak")
        ],
        controller.createStudent)
    .put(
        [
            body("email").isEmail().withMessage("email should be string"),
            body("password").isStrongPassword().withMessage("Password is weak")
        ],
        controller.updateStudent)
    .delete(controller.deleteStudent)

router.get("/students/:id", controller.getStudent)
module.exports = router;