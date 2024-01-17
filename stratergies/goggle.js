const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const goggleUserSchema = require('../database/schemas/User');


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
		const userDB =await goggleUserSchema.findById(id);
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
  new Strategy({
    clientID:
      "4327640465-33ug6nijmjov0h4skdio96l47r79a2am.apps.googleusercontent.com",
		clientSecret: "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",
		callbackURL: "http://localhost:3001/auth/google/redirect",
		scope: ["profile", "email"],
	},
		async (accessToken, refreshToken, profile, done) => {
			console.log(profile.emails[0].value,"profile");
			try {
				const googleUser = await goggleUserSchema.findOne({ email: profile.emails[0].value });
				if (googleUser) {
					console.log("user found in if");
					return done(null,googleUser)
				} else {
					const newGoogleUser = await goggleUserSchema.create({
						email: profile.emails[0].value,
						
					})
					console.log("created new user");
					return done(null,newGoogleUser)
				}
			} catch (error) {
				done(error, null);
			}
	})
);
