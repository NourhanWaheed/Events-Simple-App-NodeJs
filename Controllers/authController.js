const jwt = require('jsonwebtoken');
const Student = require("./../Models/studentModel");
const Speaker = require("./../Models/speakerModel");

module.exports.login = (request, response, next) => {
    let token;
    let tokenData;
    ///connection DB
    if (request.body.role == "admin" && request.body.userName == "admin" && request.body.password == "12345") {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        tokenData = {
            userName: request.body.userName,
            role: "admin"
        }

        const token = jwt.sign(tokenData, jwtSecretKey);
        response.status(200).json( token );

    }
    else if (request.body.role == "student") {
        Student.findOne({ email: request.body.userName, password: request.body.password })
            .then(data => {
                if (data == null)
                    throw new Error("userName and password incorrect");
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                tokenData = {
                    email: data.email,
                    role: "student"
                }

                const token = jwt.sign(tokenData, jwtSecretKey);
                response.status(200).json( token );
            })
            .catch(error => next(error))
    }
    else if (request.body.role == "speaker") {
        Speaker.findOne({ email: request.body.userName })
            .then(data => {
                data.comparePassword(request.body.password, function (err, isMatch) {
                    if (isMatch && isMatch == true) {
                        let jwtSecretKey = process.env.JWT_SECRET_KEY;
                        tokenData = {
                            email: data.email,
                            role: "speaker"
                        }

                        const token = jwt.sign(tokenData, jwtSecretKey);
                        response.status(200).json( token);
                    }
                    else
                        next(new Error("userName and password incorrect"))
                });

                if (data == null)
                    throw new Error("userName and password incorrect")
            })
            .catch(error => next(error))
    }
    // connection db findOne() then 

}