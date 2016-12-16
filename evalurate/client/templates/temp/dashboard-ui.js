Template.dashboardUI.onRendered( () => {
	$('ul.tabs').tabs();
	// $('.dynamic-space').css({
	// 	paddingTop: $('.project-desc-space').height()
	// });
	// $('.collection-with-add').css('zIndex', -999);
});

Template.dashboard.events({
	'click .dropdown-button': function (e) {
		console.log(e)
	}
});