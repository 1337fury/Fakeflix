import express from "express";
import { getTrendingMovie } from "../controllers/movie.controller.js";
import { getMovieTrailers } from "../controllers/movie.controller.js";
import { getMovieDetails } from "../controllers/movie.controller.js";
import { getSimilarMovies } from "../controllers/movie.controller.js";
import { getMoviesByCategory } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);

export default router;