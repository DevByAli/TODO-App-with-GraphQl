import { Router } from "express";

import AuthRouter from "./auth.router.js";
import TodoRouter from "./todo.router.js";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/todo", TodoRouter);

export default router;
