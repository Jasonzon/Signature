const jwt = require("jsonwebtoken")
require("dotenv").config()

function jwtGenerator(prof_id,prof_mail) {
    const payload =  {
        prof:prof_id,
        mail:prof_mail
    }

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"})
}

module.exports = jwtGenerator