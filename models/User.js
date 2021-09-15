const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide an username'],
	},
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email',
		],
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		select: false, //when we query for a user, we don't want password to be returned
	},
	resetPasswordToken: String,
	resetPasswordExpire: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
