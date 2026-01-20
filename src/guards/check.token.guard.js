const { globalError, ClientError } = require("shokhijakhon-error-handler");
const jwtService = require("../lib/jwt.service");
const readDb = require("../utils/readFile");

module.exports = async (req, res, next) => {
  try {
    let accessToken = req.headers.accesstoken;
    if (!accessToken) throw new ClientError(`Unauthorized`, 401);
    let verifyToken = jwtService.parseToken(accessToken);
    let users = await readDb("users");
    let checkUser = users.some(user => user.id == verifyToken.user_id);
    if (!checkUser) throw new ClientError(`Unauthorized`, 401);

    req.user_id = verifyToken.user_id;

    next();
  } catch (err) {
    return globalError(err, res);
  }
};
