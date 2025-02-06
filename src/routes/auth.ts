import express, { Request, Response, RequestHandler } from "express";
import { signup, login } from "../controllers/auth";

const router = express.Router();

router.post("/register", signup as RequestHandler);
router.post("/login", login as RequestHandler);

export default router;
