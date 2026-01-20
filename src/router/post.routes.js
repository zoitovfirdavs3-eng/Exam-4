const { Router } = require("express");
const postController = require("../controller/post.controller");
const checkTokenGuard = require("../guards/check.token.guard");
const postValidator = require("../utils/post.validator");

const postRouter = Router();

postRouter.get("/all", postController.GET_POSTS);

postRouter.get("/:id", postController.GET_POSTS);

postRouter.use(checkTokenGuard);

postRouter
  .route("/:id")
  .put(postController.UPDATE_POST)
  .delete(postController.DELETE_POST);

postRouter.post("/create", postValidator, postController.CREATE_POST);



module.exports = postRouter;
