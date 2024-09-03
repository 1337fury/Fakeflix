import express from "express";
import { signup, signin, signout, authCheck } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

router.get("/authCheck", protectRoute, authCheck);

export default router;
