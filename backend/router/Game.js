import express from "express";
import { startGame,setHouse,getGameSession,addAlly,removeAlly,updateDecision,updateStatsAndDecision } from "../controllers/GameSession.js";
import {UserAuthMiddleware} from "../middlewares/UserAuthMiddleware.js";

const GameRouter = express.Router();
        
GameRouter.post("/startGame", UserAuthMiddleware, startGame);
GameRouter.post("/setHouse", UserAuthMiddleware, setHouse);
GameRouter.get("/getGameSession", UserAuthMiddleware, getGameSession);
GameRouter.post("/addAlly", UserAuthMiddleware, addAlly);
GameRouter.post("/removeAlly", UserAuthMiddleware, removeAlly);
GameRouter.post("/updateDecision", UserAuthMiddleware, updateDecision);
GameRouter.post("/updateStatsAndDecision", UserAuthMiddleware, updateStatsAndDecision);

export {GameRouter};