import express from "express";
import { getTrendingTv } from "../controllers/tv.controller.js";
import { getTvTrailers } from "../controllers/tv.controller.js";
import { getTvDetails } from "../controllers/tv.controller.js";
import { getSimilarTvs } from "../controllers/tv.controller.js";
import { getTvsByCategory } from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTvs);
router.get("/:category", getTvsByCategory);

export default router;