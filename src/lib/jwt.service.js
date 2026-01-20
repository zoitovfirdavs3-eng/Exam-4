const { sign, verify } = require("jsonwebtoken");

module.exports = {
    createToken: (payload) => sign(payload, process.env.SECRET_TOKEN_KEY, { expiresIn: '5d' }),
    parseToken: (token) => verify(token, process.env.SECRET_TOKEN_KEY)
}