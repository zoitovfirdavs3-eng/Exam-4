const { globalError, ClientError } = require("shokhijakhon-error-handler");

module.exports = (req, res, next) => {
  try {
    let newPost = req.body;
    if (!newPost.post_title) throw new ClientError(`Title is required`, 400);
    if (!newPost.post_description)
      throw new ClientError(`Description is required`, 400);
    next();
  } catch (err) {
    return globalError(err, res);
  }
};
