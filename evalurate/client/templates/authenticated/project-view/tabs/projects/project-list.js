Template.projectList.helpers({
	partOfProjects: () => {
		let currentUnit = FlowRouter.getParam('id');
		return Projects.find({teams: currentUnit})
	},
	containsProjects: () => {
		let currentUnit = FlowRouter.getParam('id');
		if (Projects.find({parent: currentUnit}).count() > 0){
			return Projects.find({parent: currentUnit})
		}else {
			return false
		}
	}
})

Template.projectList.events({
	'click .bottom-add-btn': function () {
		MaterializeModal.display({
			bodyTemplate: "createProject",
			fullscreen: true
		})
	},
	'click .expand-project-info': (event) => {
		event.preventDefault()
		$('.project-info[id=' + event.currentTarget.id + ']').toggle('hidden')
	}
});

Template.projectList.onCreated(() => {
	Template.instance().subscribe('evalTemplates')
})
