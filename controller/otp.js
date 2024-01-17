const { now } = require("mongoose");
const userSchema = require("../database/schemas/User");

async function otpVerify(req, res) {
	const { otp } = req.body;
	console.log(otp);
	if (!otp) res.status(400).json("OTP not exist")
	else {
		const otpDB =await userSchema.findOne({
			otp: otp, // Check if the 'otp' field exists
			otpExpier: { $gt: now() }// Check if 'otpExpire' is greater than the current date and time
		});
		if (otpDB) {
			res.status(200).json("OTP found");
		}
		else {
			res.status(400).json("invalid otp or time lapse");
		}
	}

}
module.exports = {otpVerify}