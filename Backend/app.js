import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://fit-craft-hub.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes Import
import userRouter from "./routes/user.routes.js";
import watchListRouter from "./routes/watchlist.routes.js";
import exerciseRouter from "./routes/exercise.routes.js";
import chatRouter from "./routes/chatRoutes.routes.js";

// Routes Use
app.get("/", (req, res) => {
  res.send("🚀 FitCraftHub Backend API is running successfully!");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/watchList", watchListRouter);
app.use("/api/v1/exerciseData", exerciseRouter);
app.use("/api/v1/chat", chatRouter);

// --------------------Deployment
// const __filename = fileURLToPath(import.meta.url);
// const __dirname1 = path.dirname(__filename);
// const __dirname = path.resolve(__dirname1, '..'); 


// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, "/Frontend/dist")));

//   app.get('*', (req, res) => {
//     console.log(__dirname);
//     res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
//   });
// } else {
//   app.get("/", async function (req, res) {
//     res.send("Seriously");
//   });
// }
// --------------------Deployment

export { app };
