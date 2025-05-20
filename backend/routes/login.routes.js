import { login, checkAuth, register } from "../controllers/login.controllers.js";
import { authMiddleware } from "../utils/jwt.js";
import express from "express";

const router = express.Router();

router.post("/", login);
router.post("/login/", login);
router.get("/check", authMiddleware, checkAuth);
router.post("/register", register);

export default router;
