import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const ENV_VARS = {
	MONGO_URI: process.env.MONGO_URI,
	PORT: process.env.PORT || 5000,
};