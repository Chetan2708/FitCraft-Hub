import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addWatchList, getWatchList, removeWatchList } from "../controllers/likedList.controller.js";



const router = Router();



// Liked Exercise
router.route("/getWatchlist").get(verifyJWT, getWatchList);
router.route("/addWatchlist").post(verifyJWT, addWatchList);
router.route("/removeWatchlist").post(verifyJWT, removeWatchList);


export default router;
