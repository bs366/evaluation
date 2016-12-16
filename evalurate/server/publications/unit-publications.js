Meteor.publish( 'adminUnits', function(rt) {
	try {
		check(rt, String)
		unit = Units.findOne(rt)
		if (unit){
			return Units.find( {$and: [{$or: [{admins: this.userId},
				{owner: this.userId}]}, {root: rt}]} );
		}
		return []
	}catch (exception) {
		console.log(exception)
	}
});

Meteor.publish( 'superAdminUnits', function(rt) {
	try {
		check(rt, String)
		let unit = Units.findOne(rt)
		if (unit && unit.superAdmins.indexOf(this.userId) >= 0){
			return Units.find({root: rt})
		}
		return []
	}catch (exception){
		console.log(exception)
	}
})

Meteor.publish( 'roots', function() {
	return Units.find( {$or: [
		{members: this.userId},
		{admins: this.userId},
		{superAdmins: this.userId}],
		parent: {$exists: false}})
})

Meteor.publish('memberOfUnits', function() {
	return Units.find({members: this.userId})
})

Meteor.publish( 'singleUnitAdmin', function(id) {
	check(id, String)
	return Units.find( {admins: this.userId, _id: id} )
})
