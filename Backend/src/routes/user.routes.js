import { Router } from "express";
import {
  register,
  login,
  logoutUser,
  refreshAccess,
  changeCurrentPassword,
  updateAccountDetails,
  getCurrentUser,
  saveBmi,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

//Auth routes
router.route("/register").post(register);
router.route("/login").post(login);


//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccess);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

router.route("/saveBmi").post(verifyJWT , saveBmi)
export default router;
