const jwt = require('jsonwebtoken');
const Env = require('dotenv');

Env.config()

module.exports = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(403).send({
                message: "Token is Not Provided"
            });
        }
        const token = authorization.split(" ");
        const newtoken = token.length > 1 ? token[1] : token[0];
        jwt.verify(newtoken, process.env.SECRET)

    } catch (error) {
        return res.status(401).send({
            message: "Invalid or Expired Token",
            error
        });
    }
    return next()
}