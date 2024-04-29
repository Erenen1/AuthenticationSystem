import express from "express";
import cors from "cors"
import env from "dotenv"
import hpp from "hpp";
import helmet from "helmet"

env.config()


import { connectRedis } from "./config/redis"
import { connectDb } from "./config/mongoDB";
import session from "./config/redis"

import authRoutes from "./src/routes/auth"
import userRoutes from "./src/routes/users"

import { appLimiter } from "./security/middlewares/rateLimiter";



const app = express();
connectDb();
connectRedis();

app.use(express.json({ limit: "2kb" }));
app.use(express.urlencoded({ extended: false, limit: "1kb" }))
app.use(cors())
app.use(session);
app.use(appLimiter);
app.use(hpp());
app.use(helmet());

app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/users/", userRoutes);


app.listen(process.env.APP_PORT, () => {
    console.log("Server http://localhost:3000 üzerinde çalışıyor...");
})