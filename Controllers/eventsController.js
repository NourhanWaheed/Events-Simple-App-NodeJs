const { validationResult } = require("express-validator");
const Event = require("./../Models/eventModel");

module.exports.getAllEvents = (request, response, next) => {
    Event.find({}).populate("mainSpeaker").populate("otherSpeakers").populate("studentIds")
        .then((data) => {
            response.status(200).json({ data });
        })
        .catch(error => {
            next(error);
        })
}

module.exports.createEvent = (request, response, next) => {
    let result = validationResult(request);
    if (!result.isEmpty()) {
        let message = result.array().reduce((current, error) => current + error.msg + " ", " ");
        let error = new Error(message);
        error.status = 422;
        throw error;
    }
    console.log(request.body);
    let event = new Event({
        _id: request.body.id,
        title: request.body.title,
        eventDate: request.body.date,
        mainSpeaker: request.body.mainSpeaker,
    });
    request.body.otherSpeaker.forEach(element => {
        event.otherSpeakers.push(element);
    });
    request.body.studentIds.forEach(element => {
        event.studentIds.push(element);
    });

    event.save()
        .then((data) => {
            response.status(201).json({ message: "Event created", data });

        })
        .catch(error => next(error))
}

module.exports.updateEvent = (request, response, next) => {
    //  if(request.role!=="admin")
    // {
    //     throw new Error("Not Authorized");
    // }
    Event.findById({ _id: request.body.id })
        .then(data => {
            if (data == null)
                throw new Error("Event not exists");

            data.title = request.body.title;
            data.eventDate = request.body.date;
            data.mainSpeaker = request.body.mainSpeaker;
            request.body.otherSpeaker.forEach(element => {
                data.otherSpeakers.push(element);
            });
            request.body.studentIds.forEach(element => {
                data.studentIds.push(element);
            });
            return data.save()

        })
        .then(data => {
            response.status(200).json({ message: "Event update", data });
        })
        .catch(error => next(error))

}
module.exports.deleteEvent = (request, response) => {
    Event.deleteOne({ _id: request.query.id })
        .then(data => {
            if (data.deletedCount == 0)
                throw new Error("Event not exists");
            response.status(200).json({ message: "Event deleted" });
        })
        .catch(error => next(error))
}

module.exports.getEvent = (request, response , next) => {
    Event.findById({ _id: request.params.id })
        .then(data => {
            if (data == null)
                throw new Error("Event not exists");
            response.status(200).json({ data })
        })
        .catch(error => next(error))
}
