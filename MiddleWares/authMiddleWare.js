const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = request.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if (!verified) {
            // Access Denied
            next(new Error("Not Authenticated"));
        }
    } catch (error) {
        // Access Denied
        next(new Error("Not Authenticated"));
    }
    //authenticated
    request.role = verified.role;
    next();
}