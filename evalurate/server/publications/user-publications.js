Meteor.publish( 'userProfile', function() {
	return Meteor.users.find(this.userId)
})

Meteor.publish( 'peers', (rt) => {
		check(rt, String)
		let u = Units.findOne(rt)
		if (u.members){
			return Meteor.users.find({_id: {$in: u.members }})
		}
})
