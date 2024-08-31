import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateToken = (userId, res) => {
	const payload = {
		userId,
	};
	const secret = ENV_VARS.JWT_SECRET;
	const options = {
		expiresIn: "15d",
	};
	const token = jwt.sign(payload, secret, options);
	res.cookie("fakeflix-token", token, {
		httpOnly: true,
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production" ? true : false,
	});

	return token;
};
