const passport = require("passport");
const { Strategy } = require("passport-local");
const userSchema = require('../database/schemas/User');
const { comparePassword } = require('../util/helper');

// storing the user details in the session
passport.serializeUser((user, done) => {  
	console.log("serializing......", user);
	done(null, user.id);
})


// retrieving hte session data from the session and finding the user info from the db.
passport.deserializeUser( async (id, done) => {
	console.log("deserializing .........");
	console.log(id);
	try {
		const userDB =await userSchema.findById(id);
		if (!userDB) throw new Error("user not found");
		else {
			console.log("user found",userDB.id);
		done(null, userDB);
		}
	} catch (error) {
		done(error, null);
	}
})

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
				if (!email || !password) {
					throw new Error('invalid credential');
				}
				else {
					const userDB = await userSchema.findOne({ email });
					if (userDB) {
						if (comparePassword(password, userDB.password)) {
							console.log("login successfull");
							done(null,userDB)
						} else {
							console.log("login failed");

							done(null, null);
						}
					} else {
						throw new Error('user not found');
					}
				}
			} catch (error) {
				done(err, null);
			}
    }
  )
);
