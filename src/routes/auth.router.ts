import express from "express";
import multer from "multer";
import { AuthController } from "../controllers/auth.controller";


const authRouter = express.Router();

authRouter.post(
  "/auth/login",
  (req, res) => {
    AuthController.login(req, res);
  });

authRouter.post(
  "/auth/register",
  multer().any(),
  (req, res) => {
    AuthController.register(req, res);
  });

export default authRouter;
