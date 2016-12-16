Template.membersList.events({
	'click .collection-item a': function (e) {
		Session.set("currentProfile", e.currentTarget.id);
		$('.profile-view-modal').css({
			visibility: 'visible',
			opacity: 1
		})
		$('.s3.profile-modal').animateCss('fadeInRight');
	},
	'click .add-member': (event) => {
		event.preventDefault()
		MaterializeModal.display({
			bodyTemplate: "allMembersList"
		})
	}
});

Template.allMembersList.helpers({
	members: function () {
		let u = Units.findOne(FlowRouter.getParam('id'))
		if (!u.members) u.members = []
		return Meteor.users.find({_id: {$not: {$in: u.members}}})
	}
})

Template.allMembersList.events({
	'click .select-member': (event) => {
		event.preventDefault();
		$('a.select-member#'.concat(event.currentTarget.id)).toggleClass('active')
	},
	'click .add-group-member': (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (FlowRouter.getParam('id')){
			let u = Units.findOne(FlowRouter.getParam('id'))
			if (u) {
				if (!u.members){
					Units.update(u._id, {$set: {members: [event.currentTarget.id]}})
				}else {
					Units.update(u._id, {$addToSet: {members: event.currentTarget.id}})
				}
			}
		}
	},
	'click #add-group-members': (event) => {
		event.preventDefault();
		let selectedMembers = []
		let obj = $('a.select-member.active')
		for (let i = 0; i < obj.length; i++) {
			selectedMembers.push(obj[i].id)
		}
		if (FlowRouter.getParam('id')){
			let u = Units.findOne(FlowRouter.getParam('id'))
			if (u) {
				if (!u.members){
					Units.update(u._id, {$set: {members: selectedMembers}})
				}else {
					Units.update(u._id, {$push: {members: {$each: selectedMembers}}})
				}
			}
		}
	}
})
