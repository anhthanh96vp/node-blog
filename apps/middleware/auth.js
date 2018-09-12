import passport from "passport";
import keyPassport from '../../config/keyPassport'
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
	new FacebookStrategy(
		{
			clientID: keyPassport.facebook.clientID,
			clientSecret: keyPassport.facebook.clientSecret,
			callbackURL: keyPassport.facebook.callbackURLLocal,
			profileFields: keyPassport.facebook.profileFields,
			graphApiVersion: keyPassport.facebook.graphApiVersion
		},
		function (accessToken, refreshToken, profile, done) {
			let username;
			console.log(profile);
			const password = `${profile.id}pass`;
			const image = profile.photos[0]
				? profile.photos[0].value
				: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Antu_im-invisible-user.svg/2000px-Antu_im-invisible-user.svg.png";
			done(null, username)
			// const newUser = User.findOrCreate({
			// 	where: { username },
			// 	defaults: { username, password, image },
			// 	fields: ["username", "password", "image"]
			// })
			// 	.then(function(result) {
			// 		return done(null, result[0]);
			// 	})
			// 	.catch(function(err) {
			// 		return done(err);
			// 	});
		}
	)
);