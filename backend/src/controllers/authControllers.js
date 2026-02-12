const User = require("../models/userModel");
const {
	validationSignup,
	validationLogin,
} = require("../utils/authValidators");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
	try {
		const { firstName, lastName, email, password, age, skills } = req.body;
		validationSignup(req);

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const userToSave = await User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			age,
			skills,
		});

		await userToSave.save();

		res.status(200).json({
			success: true,
			message: "User inserted succesfully",
			user: userToSave,
		});
	} catch (error) {
		console.error(`Error during signup: ${error.message}`);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		validationLogin(req);

		const user = await User.findOne({
			email: email,
		});

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		const hashedPassword = user.password;
		const isValidPassword = await user.checkPassword(password);

		if (!isValidPassword) {
			console.error(
				`Password ${password} does not match with the hash ${hashedPassword}`,
			);
			return res.status(400).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		const token = await user.generateJWT();
		res.cookie("token", token, {
			expires: new Date(Date.now() + 8 * 3600000),
		});

		return res.status(200).json({
			success: true,
			message: "User logged in successfully",
			user,
			token,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

const logoutController = async (req, res) => {
	try {
		const { token } = req?.cookies;
		if (!token) {
			return res.status(200).json({
				message: "User not logged in",
			});
		}

		res.clearCookie("token");

		return res.status(200).json({
			success: true,
			message: "User logged out succesfully",
		});
	} catch (error) {
		console.error(`Error while logging out: ${error.message}`);
	}
};

module.exports = { signupController, loginController, logoutController };
