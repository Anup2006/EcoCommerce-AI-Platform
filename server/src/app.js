import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: " Application is running!!"
  });
});

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded())
app.use(cookieParser())

import aiGeneratorRouter from "./routes/aiGenerator.routes.js";
import userRouter from "./routes/user.routes.js";
import orderRouter from "./routes/orders.routes.js";
import chatbotRouter from "./routes/aiChatbot.routes.js";
import aiLogRouter from "./routes/aiLog.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

app.use("/api/v1/users",userRouter);
app.use("/api/v1/aiGenerator",aiGeneratorRouter);
app.use("/api/v1/orders",orderRouter);
app.use("/api/v1/chatbot",chatbotRouter);
app.use("/api/v1/ai-logs",aiLogRouter);
app.use("/api/v1/dashboard",dashboardRouter);

export {app}