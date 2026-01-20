const { globalError, ClientError } = require("shokhijakhon-error-handler");
const readDb = require("../utils/readFile");
const writeDb = require("../utils/writeFile");

module.exports = {
  async CREATE_POST(req, res) {
    try {
      let posts = await readDb("posts");
      let newPost = req.body;
      newPost = {
        id: posts.length ? posts.at(-1).id + 1 : 1,
        ...newPost,
        createdAt: new Date().toLocaleString(),
        updatedAt: null,
        user_id: req.user_id,
      };
      posts.push(newPost);
      await writeDb("posts", posts);
      return res
        .status(201)
        .json({ message: "Post successfully created", status: 201 });
    } catch (err) {
      return globalError(err, res);
    }
  },
  async GET_POSTS(req, res) {
    try {
      let posts = await readDb("posts");
      let { id } = req.params;
      if (id) {
        let findPost = posts.find(post => post.id == id);
        if (!findPost) throw new ClientError(`Post not found`, 404);
        return res.json(findPost);
      }
      return res.json(posts);
    } catch (err) {
      return globalError(err, res);
    }
  },
  async UPDATE_POST(req, res) {
    try {
      let posts = await readDb("posts");
      let { id } = req.params;
      let findPost = posts.find(post => post.id == id);
      if (!findPost) throw new ClientError(`Post not found`, 404);
      if (findPost.user_id != req.user_id)
        throw new ClientError(`Forbidden`, 403);
      let idx = posts.findIndex(post => post.id == id);
      posts[idx] = {
        ...posts[idx],
        ...req.body,
        updatedAt: new Date().toLocaleString(),
      };
      await writeDb("posts", posts);
      return res.json({ message: "Post successfully updated", status: 200 });
    } catch (err) {
      return globalError(err, res);
    }
  },
  async DELETE_POST(req, res) {
    try {
      let posts = await readDb("posts");
      let { id } = req.params;
      let findPost = posts.find(post => post.id == id);
      if (findPost.user_id !== req.user_id)
        throw new ClientError("Forbidden", 403);
      posts = posts.filter(post => post.id != id);
      await writeDb("posts", posts);
      return res.json({ message: "Post successfully deleted", status: 200 });
    } catch (err) {
      return globalError(err, res);
    }
  },
};
