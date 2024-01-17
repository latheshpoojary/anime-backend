const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	firstName: {
		type: mongoose.SchemaTypes.String,
	},
	lastName: {
		type:mongoose.SchemaTypes.String
	},
	password: {
		type: mongoose.SchemaTypes.String,
		// required: true,
	},
	email: {
		type: mongoose.SchemaTypes.String,
		required: true,
		unique:true
	},
	logedType: {
		type:mongoose.SchemaTypes.String
	},
	otp: {
		type:mongoose.SchemaTypes.Number
	},
	otpExpier: {
		type:mongoose.SchemaTypes.Date
	},
	createdAt: {
		type: mongoose.SchemaTypes.Date,
		required: true,
		default:new Date()
	}
})

module.exports = mongoose.model('user', userSchema);