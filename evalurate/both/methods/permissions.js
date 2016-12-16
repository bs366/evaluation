Meteor.methods({
	checkUnitPermissions: (perm, unitId, userId) => {
		check(unitId, String)
		check(userId, String)
		check(perm, String)
		unit = Units.findOne({_id: unitId})
		user = Meteor.users.findOne({_id: userId})

		if (unit.owner == userId){
			return true
		}
		else if (unit.admins.indexOf(userId) !== -1) {
			if (perm == 'canView'){
				return true
			}else{
				return unit.adminPerm[perm]
			}
		}
		else {
			let parent = Units.findOne(unit.parent)
			while (parent){
				if (parent.superAdmins && parent.superAdmins.indexOf(userId) !== -1)
					return unit.superAdminPerm[perm]
				parent = Units.findOne(parent.parent)
			}
		}
		return false;
	}
})