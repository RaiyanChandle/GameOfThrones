import express from "express";  
import cors from "cors";
import connectDB from "./utils/dbConnent.js";
import {UserRouter} from "./router/User.js";
import {GameRouter} from "./router/Game.js";

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/game", GameRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
