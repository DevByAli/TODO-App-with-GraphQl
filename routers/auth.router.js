import { Router } from "express";
import * as AuthController from "../controllers/auth.controller.js";
import asyncMiddlware from "../middlewares/async.middleware.js";

const AuthRouter = Router();

AuthRouter.post("/signup", asyncMiddlware(AuthController.SignUp));
AuthRouter.post("/login", asyncMiddlware(AuthController.Login));

export default AuthRouter;
