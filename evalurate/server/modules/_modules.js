Modules.server = {};

Accounts.onCreateUser((options, user) => {
	if (user.services.google) {
		user.profile = {}
		user.profile.firstName = user.services.google.given_name
		user.profile.lastName = user.services.google.family_name
		user.profile.avatar = user.services.google.picture
	}
	else if (options.profile){
		user.profile = options.profile
	}
	return user
})
