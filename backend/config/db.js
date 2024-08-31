import { mongoose } from "mongoose";
import { ENV_VARS  } from "./envVars.js";

export const connectDB = async () => {
	try {
		const connection = await mongoose.connect(ENV_VARS.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB connected: ${connection.connection.host}`);
	} catch (error) {
		process.exit(1);
		console.error(`MongoDB connection failed: ${error}`);
	}
}