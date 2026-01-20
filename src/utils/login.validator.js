const { ClientError, globalError } = require("shokhijakhon-error-handler");

module.exports = (req, res, next) => {
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  try {
    let newUser = req.body;
    if (!newUser.email) throw new ClientError(`Email is required`, 400);
    if (!emailRegex.test(newUser.email))
      throw new ClientError(`Email is not valid`, 400);
    if (!newUser.password) throw new ClientError(`Password is required`, 400);

    next();
  } catch (err) {
    return globalError(err, res);
  }
};
