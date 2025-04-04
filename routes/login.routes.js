import { login, checkAuth } from "../controllers/login.controllers.js";
import { authMiddleware } from "../utils/jwt.js";
import express from "express";

const router = express.Router();

router.post("/", login);
router.post("/login/", login);
router.get("/check", authMiddleware, checkAuth);

export default router;
