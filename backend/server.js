import express from "express";
import cookieParser from "cookie-parser";

import { protectRoute } from "./middleware/protectRoute.js";

import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import tvRoutes from "./routes/tv.routes.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectDB();
});