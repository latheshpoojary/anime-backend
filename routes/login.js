const { Router } = require("express");
const { route } = require("./naruto");
const passport = require("passport");
const userSchema = require("../database/schemas/User");
const { hashPassword, comparePassword } = require("../util/helper");
const { authRegister } = require("../controller/auth");
const { googleLogin } = require("../controller/googleLogin");
const { login } = require("../controller/login");
const { forgotPassword } = require("../controller/forgot");
const { otpVerify } = require("../controller/otp");
const { resetPassword } = require("../controller/resetpassword");
const { verifyToken } = require('../middleware/jwt');
const router = Router();

// router.post("/login", async (req, res) => {
//   const { email,password } = req.body;
// 	if (!email || !password) {
// 		res.send(400);
// 	}
// 	else {
// 		const userDB = await userSchema.findOne({ email });
// 		if (userDB) {
// 			if (comparePassword(password, userDB.password)) {
// 				req.session.user = userDB;
// 				res.send("Successfull login");
// 			}
// 			else {
// 				res.send("failed login");
// 			}
// 		}
// 		else {
// 			res.send(401);
// 		}
// 	}
// });

// router.post('/login', passport.authenticate('local'), (req, res) => {
// 	res.send(200);
// })

router.post("/google", googleLogin);
router.post('/login',login)
router.post("/register", authRegister);

router.post("/forgot", forgotPassword);
router.post('/otp', otpVerify);
router.post('/reset', resetPassword);

module.exports = router;
