Template.projectViewTabs.onRendered( () => {
	$('#projectTabs').tabs();
});

Template.adminViewTabs.onRendered( () => {
	$('#adminTabs').tabs();
});

Template.dashboard.events({
	'click .dropdown-button': function (e) {
		//console.log(e)
	}
});


//We can't use autorun when we use an arrow function. It screws up 'this'
//This is how we should be doing template level subscriptions if we can
//Change a parameter in a route without destroying a template.
//We are loading as little data as possible this way.
//singleUnitAdmin is useless right now however because we are always subscribed to all
//Units as an admin
Template.dashboard.onCreated( function() {
	var self = this;
	self.autorun(function() {
		FlowRouter.watchPathChange();
	  	let currentContext = FlowRouter.getParam('id');
	  	if (currentContext) {
			self.subscribe( 'singleUnitAdmin', currentContext)
	  		self.subscribe( 'projectsList', currentContext)
	  	}
	});
});

Template.dashboard.helpers({
	unit: () => {
		return Units.findOne(FlowRouter.getParam('id'))
	}
})
