const { validationResult } = require("express-validator");
const Student = require("./../Models/studentModel");

//Get All Students
module.exports.getAllStudents = (request, response, next) => {
    Student.find({})
        .then((data) => {
            response.status(200).json( data );
        })
        .catch(error => {
            next(error);
        })

}

module.exports.createStudent = (request, response, next) => {

    let result = validationResult(request);
    if (!result.isEmpty()) {
        let message = result.array().reduce((current, error) => current + error.msg + " ", " ");
        let error = new Error(message);
        error.status = 422;
        throw error;
    }

    let student = new Student({
        _id: request.body.id,
        email: request.body.email,
        password: request.body.password
    })

    student.save()
        .then((data) => {
            response.status(201).json({ message: "Student created", data });

        })
        .catch(error => next(error))
}

module.exports.updateStudent = (request, response, next) => {
    //  if(request.role!=="admin")
    // {
    //     throw new Error("Not Authorized");
    // }

    Student.updateOne({ _id: request.params }, {
        $set: {
            email: request.body.email,
            password: request.body.password
        }
    }).then(data => {
        if (data.matchedCount == 0)
            throw new Error("Student not exists");

        response.status(200).json({ message: "Student update", data });

    })
        .catch(error => next(error))
}
module.exports.deleteStudent = (request, response, next) => {

    Student.deleteOne({ _id: request.query.id })
        .then(data => {
            if (data.deletedCount == 0)
                throw new Error("Student not exists");
            response.status(200).json({ message: "Student deleted" });
        })
        .catch(error => next(error))

}

module.exports.getStudent = (request, response, next) => {
    console.log(request.params.id);
    Student.findById({ _id: request.params.id })
        .then(data => {
            if (data == null)
                throw new Error("Student not exists");
            response.status(200).json({ data })
        })
        .catch(error => next(error))
}
