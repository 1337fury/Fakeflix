import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ENV_VARS } from '../config/envVars.js';

export const protectRoute = async (req, res, next) => {
	try {
		const cookie = req.cookies['fakeflix-token'];

		if (!cookie) {
			return res.status(401).json({ success: false, message: "Unauthorized" });
		}

		const decoded = jwt.verify(cookie, ENV_VARS.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ success: false, message: "Unauthorized" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(401).json({ success: false, message: "Unauthorized" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.error("Error in protectRoute middleware:", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};