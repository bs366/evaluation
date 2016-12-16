
Meteor.methods({
	inviteUser( unitId, email ) {
		check(email, String)
		check(unitId, String)

		try {
			let user = Meteor.users.findOne({ $or: [{ "emails.address": email }, { "services.google.email": email }] });
			let	unit = Units.findOne({ _id: unitId }, {fields: {name: 1} });
			let	u = Units.update(unitId, {$addToSet: {members: user._id}});
			console.log(unit);
			Notifications.insert({
				userId: user._id,
				message: "You have been added to " + unit.name, 
				createdAt:  new Date().toISOString()
			});
			
			return u
		} catch (exception) {
			console.log(exception)
			return exception
		}
	}
})