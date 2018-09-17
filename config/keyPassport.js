module.exports = {
	facebook: {
		clientID: "496750797455383",
		clientSecret: "b299f16c9b475199d5d8b5acec7898f4",
		callbackURLLocal:
			"https://localhost:3000/auth/login/facebook/callback",
		callbackURLHost: "https://thanhvp.herokuapp.com/auth/login/facebook/callback",
		profileFields: ["id", "name", "picture.type(large)", "email"],
		graphApiVersion: "v3.1"
	},
	github: {
		clientID: "a7e0f355ad398d6e24d9",
		clientSecret: "c45101d260c4758a25f25219518fb9f691792f02",
		callbackURLLocal: "http://localhost:3000/auth/login/github/callback",
		callbackURLHost: "https://thanhvp.herokuapp.com/auth/login/github/callback",
		profileFields: ["id", "name", "picture.type(large)", "email"]
	},
	twitter: {
		clientID: "a7e0f355ad398d6e24d9",
		clientSecret: "c45101d260c4758a25f25219518fb9f691792f02",
		callbackURLLocal: "https://localhost:3000/auth/login/twitter/callback",
		callbackURLHost: "https://thanhvp.herokuapp.com/auth/login/twitter/callback",
		profileFields: ["id", "name", "picture.type(large)", "email"]
	},
	google: {
		clientID:
			"646454292770-1lhfre1gt23ig56g60fpdnuhg37k7cjj.apps.googleusercontent.com",
		clientSecret: "JZSnps73g3GomuslNEX8YxHq",
		callbackURLLocal: "http://localhost:3000/auth/login/google/callback",
		callbackURLHost: "https://thanhvp.herokuapp.com/auth/login/google/callback",
		profileFields: ["id", "name", "picture.type(large)", "email"]
	}
};
