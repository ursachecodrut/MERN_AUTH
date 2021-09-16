const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const user = await User.create({
			username,
			email,
			password,
		});
		sendToken(user, 201, res);
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		next(new ErrorResponse('Please provide email or password', 400));
	}

	try {
		const user = await User.findOne({ email }).select('+password');
		if (!user) {
			next(new ErrorResponse('Invalid Credentials', 401));
		}

		const isMatch = await user.matchPasswords(password);

		if (!isMatch) {
			next(new ErrorResponse('Invalid Credentials', 401));
		}

		sendToken(user, 200, res);
	} catch (error) {
		next(error);
	}
};

exports.forgotPassword = async (req, res, next) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return next(new ErrorResponse('Email could not be send', 404));
		}
		const resetToken = user.getResetPasswordToken();

		await user.save();

		const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

		const message = `
			<h1>You have requested a password reset</h1>
			<p>Please go to this link to reset your password</p>
			<a href=${resetUrl} clicktracking=off>${resetUrl}</a>
		`;

		try {
			await sendEmail({
				to: user.email,
				subject: 'Password Reset Request',
				text: message,
			});

			res.status.send(200).json({ success: true, data: 'Email Send' });
		} catch (error) {
			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;

			await user.save();

			return next(new ErrorResponse('Email could not be send', 500));
		}
	} catch (error) {
		next(error);
	}
};

exports.resetPassword = (req, res, next) => {
	res.send('Reset Password route');
};

const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken();
	res.status(statusCode).json({ success: true, token: token });
};
