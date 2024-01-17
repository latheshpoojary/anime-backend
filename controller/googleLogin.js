const userSchema = require('../database/schemas/User');
async function googleLogin(req, res) {
	const { firstName, lastName } = req.body;
    const googleUser = await userSchema.findOne({ email: req.body.email });
    if (googleUser) {
      console.log("user found in if");
      res.status(200).json("user already exist");
    } else {
      const newGoogleUser = await userSchema
				.create({
					firstName,
					lastName,
          email: req.body.email,
          logedType:'google'
        })
      res.status(200).json("User Created Successfully");
    }
} 
	
module.exports = {googleLogin}