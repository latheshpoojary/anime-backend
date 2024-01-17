const userSchema = require("../database/schemas/User");
const { hashPassword } = require("../util/helper");

async function resetPassword(req, res) {
  const { otp, password } = req.body;
console.log(otp,password);
	if (!otp || !password) res.status(400).json("Not found otp or password");
	const hashedPass = hashPassword(password);
  const response =userSchema.findOneAndUpdate(
    { otp: otp },
    {
      otp: null,
      otpExpier: null,
      password: hashedPass,
    }
	);
	console.log(password);
	response.then(() => {
		res.status(200).json("Password reset successfully");
	})
		.catch((err) => {
			console.log(err);
			res.status(400).json("Invalid Otp or password");
	})
}

module.exports = { resetPassword };
