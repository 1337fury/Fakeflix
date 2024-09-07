import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export async function signup(req, res) {
	try {
		const { username, email, password } = req.body;
	
		if (!username || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			return res.status(400).json({ message: "Invalid email" });
		}

		if (password.length < 6) {
			return res.status(400).json({ message: "Password must be at least 6 characters long" });
		}

		const existingEmail = await User.findOne({ email }); // findOne is a Mongoose method that finds a single document based on the filter object

		if (existingEmail) {
			return res.status(400).json({ message: "Email already exists" });
		}

		const existingUsername = await User.findOne({ username });

		if (existingUsername) {
			return res.status(400).json({ message: "Username already exists" });
		}

		const salt = await bcryptjs.genSalt(10);
		const passwordHash = await bcryptjs.hash(password, salt);

		const PROFILE_PICTURE = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];

		const image = PROFILE_PICTURE[Math.floor(Math.random() * PROFILE_PICTURE.length)];

		const newUser = new User({
			username,
			email,
			password: passwordHash,
			image
		});

		generateToken(newUser._id, res);
		await newUser.save(); 

		res.status(201).json({
			success: true,
			user: {
				...newUser._doc, // The _doc property contains document fields and values as key-value pairs (e.g., { _id: 123, username: "john_doe", email: "
				password: undefined // We don't want to send the password back to the client
			},
		});
	}
	catch (error) {
		console.error("Error in signup controller:", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export async function signin(req, res) {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const isPasswordCorrect = await bcryptjs.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		generateToken(user._id, res);

		res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: undefined
			},
		});
	}
	catch (error) {
		console.error("Error in signin controller:", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export async function signout(req, res) {
	try {
		res.clearCookie("fakeflix-token");
		res.status(200 ).json({ success: true, message: "Signout success" });
	}
	catch (error) {
		console.error("Error in signout controller:", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export async function authCheck(req, res) {
	try {
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}
		
		res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: undefined
			},
		});
	} catch (error) {
		console.error("Error in authCheck controller:", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}