import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn,isAdmin,testController);
// 1. requireSignIn: Validates the presence and validity of a JWT token (ensures the user is signed in).
// 2. isAdmin: Checks if the signed-in user has admin privileges.
// 3. testController: Handles the request if the previous checks pass.

export default router;