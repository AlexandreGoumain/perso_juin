import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

// POST http://localhost:3000/auth/login
router.post("/login", authController.login);

// POST http://localhost:3000/auth/register
router.post("/register", authController.register);

// GET http://localhost:3000/auth/logout
router.get("/logout", authController.logout);

export default router;
