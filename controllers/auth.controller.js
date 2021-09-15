const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const user = await User.create({
			username,
			email,
			password,
		});
		res.status(201).json({
			success: true,
			user,
		});
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

		res.status(200).json({
			success: true,
			token: 'dsfasfsd',
		});
	} catch (error) {
		next(error);
	}
};

exports.forgotPassword = (req, res, next) => {
	res.send('Resgister route');
};

exports.resetPassword = (req, res, next) => {
	res.send('Reset Password route');
};
