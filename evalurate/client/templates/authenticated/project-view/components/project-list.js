Template.projectList.helpers({
	projects: () => {
		let currentUnit = FlowRouter.getParam('id');
		//console.log(projectsList)
		return Projects.find()
	}
})