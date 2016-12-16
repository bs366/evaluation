let _ = lodash
var teamIndex = 1
var teams = new Meteor.Collection(null)

Template.createProject.helpers({
	groupOptions: function () {
		return teams.find()
	},
	members: function () {
		thisUnit = Units.findOne(FlowRouter.getParam('id'))
		return Meteor.users.find({_id: {$in: thisUnit.members}})
	},
	currentTeamMembers: () => {
		if (Session.get('currentTeam')){
			let u = teams.findOne(Session.get('currentTeam'))
			if (u) {
				if (u.members && u.members.length > 0)
					return Meteor.users.find({_id: {$in: u.members}})
			}
		}
		return false
	},
	currentDivision: () => {
		return Units.findOne(FlowRouter.getParam('id'));
	}
});

Template.addTeamForm.helpers({
	teamNum: () => {
		return Session.get('teamIndex')
	},
	permanentGroups: function () {
		let currentDivision = Units.findOne({_id: FlowRouter.getParam('id')})
		let groupList = currentDivision.children
		let returnThis = []
		test = _.forIn(groupList, function(value, key) {
			if (!teams.findOne(value))
				returnThis.push({label: Blaze._globalHelpers.unitName(value), value: value})
		})
		return returnThis
	},
})

Template.createProject.events({
	'click .select-member': (event) => {
		event.preventDefault();
		$('a.select-member[id=' + event.currentTarget.id + ']').toggleClass('active')
	},
	'click .select-team': (event) => {
		event.preventDefault();
		$('a.select-team.active').toggleClass('active')
		$('a#'.concat(event.currentTarget.id)).toggleClass('active')
		Session.set('currentTeam', event.currentTarget.id)
	},
	'click .add-team-member': (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (Session.get('currentTeam')){
			let u = teams.findOne(Session.get('currentTeam'))
			if (u) {
				if (!u.members){
					teams.update(u._id, {$set: {members: [event.currentTarget.id]}})
				}else {
					teams.update(u._id, {$addToSet: {members: event.currentTarget.id}})
				}
			}
		}
	},
	'click #add-team-members': (event) => {
		event.preventDefault();
		let selectedMembers = []
		let obj = $('a.select-member.active')
		for (let i = 0; i < obj.length; i++) {
			selectedMembers.push(obj[i].id)
		}
		if (Session.get('currentTeam')){
			let u = teams.findOne(Session.get('currentTeam'))
			if (u) {
				if (!u.members){
					teams.update(u._id, {$set: {members: selectedMembers}})
				}else {
					teams.update(u._id, {$push: {members: {$each: selectedMembers}}})
				}
			}
		}
	},
	'click .remove-team-member': (event) => {
		event.preventDefault();
		teams.update(Session.get('currentTeam'), {$pull: {members: event.currentTarget.id}})
	},
	'click .remove-team': (event) => {
		event.preventDefault();
		event.stopPropagation();
		teams.remove(event.currentTarget.id)
	},
	'click #clear-member-selection': (event) => {
		event.preventDefault();
		$('a.select-member.active').toggleClass('active')
	},
	'click #member-shuffle': (event) => {
		let i = 0;
		let thisUnit = Units.findOne(FlowRouter.getParam('id'))
		let users = Meteor.users.find({_id: {$in: thisUnit.members}}, {sort: {_id: 1}}).fetch()
		while(i < users.length){
			teams.find().forEach((team) => {
				if (i < users.length){
					if (team.members){
						teams.update(team._id, {$addToSet: {members: users[i++]._id }})
					}else {
						teams.update(team._id, {$set: { members: [users[i++]._id] }})
					}
				}
			})
		}
	}
})

Template.addTeamForm.events({
	'submit #add-team-form': (event) => {
		event.preventDefault();
		event.stopPropagation();
		teams.insert({name: event.target.name.value, _id: teamIndex.toString(), placeholder: true})
		Session.set('teamIndex', ++teamIndex)
	},
	'click .add-permanent-team': (event) => {
		event.preventDefault()
		teams.insert(Units.findOne(event.currentTarget.id))
	}
})

Template.createProject.onRendered(() => {
	if (Session.get('currentTeam')){
		let u = Units.findOne(Session.get('currentTeam'))
		if (u) {
			$('a.select-team.active').toggleClass('active')
			$('a.select-team#'.concat(u._id)).toggleClass('active')
		}
	}
	$('.dropdown-button#subgroups-chooser').dropdown({
	   inDuration: 300,
	   outDuration: 225,
	   constrain_width: true,
	   hover: false,
	   gutter: 0,
	   belowOrigin: true
	   }
	);
	Session.set('teamIndex', teamIndex)
})

AutoForm.hooks({
    insertProjectForm: {
    	before: {
    		insert: (doc) => {
    			doc.owner = Meteor.userId()
    			doc.parent = FlowRouter.getParam('id')
    			doc.teams = []
    			return doc
    		}
    	},
		onSuccess: (formType, result) => {
			let doc = Projects.findOne(result)
			ids = []
            teams.find().forEach((team) => {
                if (team.placeholder){
                    let id = Units.insert({
                        name: team.name,
                        owner: Meteor.userId(),
                        admins: [Meteor.userId()],
                        parent: FlowRouter.getParam('id'),
                        members: team.members,
                        root: Session.get('root'),
                        temp: true,
                        project: result,
                        adminPerm: {
                            'canEval': true,
                            'canDivide': true,
                            'canAlterPerms': true,
                            'canAlterMembers': true
                        },
                        superAdminPerm: {
                            'canView': true,
                            'canEval': false,
                            'canDivide': false,
                            'canAlterPerms': false,
                            'canAlterMembers': false
                        }
                    })
                    Units.update(FlowRouter.getParam('id'), { $addToSet: { children: id}})
                    ids.push(id)
                }else {
                	Units.update(team._id, {$set: {members: team.members}})
                    ids.push(team._id)
                }
            })
            Projects.update(result, {$set: {teams: ids}})
		}
    }
})
