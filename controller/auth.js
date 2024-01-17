const userSchema = require("../database/schemas/User");
const { hashPassword } = require("../util/helper");
async function authRegister(req, res) {
  const { firstName, lastName, email} = req.body;
  const userDB = await userSchema.findOne({ email });
  if (userDB) {
    res.status(400).json("user already exist!");
  } else {
    const password = hashPassword(req.body.password);
    const newUser = userSchema.create({
      firstName,
      lastName,
      password,
			email,
    });
    (await newUser).save();
    res.status(200).json({"message":"suceessfull"});
  }
}

module.exports = { authRegister };
