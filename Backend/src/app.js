import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";




const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true ,
  }) 
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Routes  Import

import userRouter from "./routes/user.routes.js";
import watchListRouter from "./routes/watchlist.routes.js";
import exerciseRouter from "./routes/exercise.routes.js";
import chatRouter from "./routes/chatRoutes.routes.js";

//Routes  Use
app.use("/api/v1/user", userRouter);
app.use("/api/v1/watchList", watchListRouter);
app.use("/api/v1/exerciseData", exerciseRouter)
app.use("/api/v1/chat",chatRouter)



export { app };
