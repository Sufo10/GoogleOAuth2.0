const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');

const CLIENT_ID = '717163906271-hrfuj4nmhlm4sjhfmeicq4sigihod7la.apps.googleusercontent.com';
const CLIENT_SECRET = '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';

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy({
		//options for google strat
		clientID: CLIENT_ID,
		clientSecret: CLIENT_SECRET,
		callbackURL: '/auth/google/redirect'
	}, (accessToken, refreshToken, profile, done) => {
		console.log(profile);
		//passport callback func
		User.findOne({ googleId: profile.id })
			.then((currentUser) => {
				if (currentUser) {
					console.log(`User is: ${currentUser}`);
					done(null, currentUser); //moves to serialize user
				}
				else {
					new User({
						username: profile.displayName,
						googleId: profile.id,
						thumbnail: profile._json.picture

					}).save()
						.then((newUser) => {
							console.log(`new user Created: ${newUser}`);
							done(null, newUser); //moves to serialize user
						});
				}
			});


	})
);