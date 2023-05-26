const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    return jwt.sign({id}, "someth", {
        expiresIn: "40d"
    })
};

module.exports = { generateToken };
