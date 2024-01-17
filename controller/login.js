const jwt = require("jsonwebtoken");
const userSchema = require("../database/schemas/User");
const enviroments = require("../enviroments/enviroments");
const { comparePassword } = require("../util/helper");
const { options } = require("../routes/naruto");

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json("Invalid Credential");
  } else {
    const userDB = await userSchema.findOne({ email });
    if (userDB) {
			if (comparePassword(password, userDB.password)) {
				// create jwt token
				const token = jwt.sign({email}, enviroments.secret, 
					{ expiresIn: '1d' }   //expireIn needed for generating different token for evry login
				)
        res.status(200).json({ message: "suceessfull", token: token });
      } else {
        res.status(401).json("Invalid Creadential");
      }
    } else {
      res.status(401).json("user not exist");
    }
  }
}

module.exports = { login };
