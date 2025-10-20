import express from "express";
import { register, login } from "../controllers/UserAuth.js";

const UserRouter = express.Router();
        
UserRouter.post("/register", register);
UserRouter.post("/login", login);

export {UserRouter};
