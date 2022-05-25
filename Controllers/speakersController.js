const { validationResult } = require("express-validator");
const Speaker = require("./../Models/speakerModel");

module.exports.getAllSpeakers = (request, response, next) => {
    Speaker.find({})
        .then((data) => {
            response.status(200).json({ data });
        })
        .catch(error => {
            next(error);
        })
}


module.exports.createSpeaker = (request, response, next) => {

    let result = validationResult(request);
    if (!result.isEmpty()) {
        let message = result.array().reduce((current, error) => current + error.msg + " ", " ");
        let error = new Error(message);
        error.status = 422;
        throw error;
    }

    let speaker = new Speaker({
        email: request.body.email,
        password: request.body.password,
        userName: request.body.userName,
        address: {
            city: request.body.city,
            street: request.body.street,
            buildingNumber: request.body.buildingNumber
        }
    });

    speaker.save()
        .then((data) => {
            response.status(201).json({ message: "speaker created", data });

        })
        .catch(error => next(error))
}

module.exports.updateSpeaker = (request, response, next) => {
    //  if(request.role!=="admin")
    // {
    //     throw new Error("Not Authorized");
    // }
    Speaker.updateOne({ _id: request.body.id }, {
        $set: {
            email: request.body.email,
            password: request.body.password,
            userName: request.body.userName,
            address: {
                city: request.body.city,
                street: request.body.street,
                buildingNumber: request.body.buildingNumber
            }
        }
    }).then(data => {
        if (data.matchedCount == 0)
            throw new Error("Speaker not exists");

        response.status(200).json({ message: "Speaker update", data });

    })
        .catch(error => next(error))

}
module.exports.deleteSpeaker = (request, response) => {
    Speaker.deleteOne({ _id: request.query.id })
        .then(data => {
            if (data.deletedCount == 0)
                throw new Error("Speaker not exists");
            response.status(200).json({ message: "Speaker deleted" });
        })
        .catch(error => next(error))
}

module.exports.getSpeaker = (request, response, next) => {
    Speaker.findById({ _id: request.params.id })
        .then(data => {
            if (data == null)
                throw new Error("Speaker not exists");
            response.status(200).json({ data })
        })
        .catch(error => next(error))
}

