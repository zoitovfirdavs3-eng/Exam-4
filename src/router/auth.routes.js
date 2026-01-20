const { Router } = require("express");
const authController = require("../controller/auth.controller");
const loginValidator = require("../utils/login.validator");
const registerValidator = require("../utils/register.validator");

const authRouter = Router();

authRouter.post("/register", registerValidator, authController.REGISTER);
authRouter.post("/login", loginValidator, authController.LOGIN);

module.exports = authRouter;