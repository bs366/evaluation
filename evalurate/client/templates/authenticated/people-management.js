Template.peopleManagement.helpers({
	people: function () {
		return Meteor.users.find()
	}
});