Template.projectsSidebar.onCreated(() => {
    if (Session.get('root'))
      Template.instance().subscribe('peers', Session.get('root'))
    Template.instance().subscribe('usersProjects')
    Template.instance().subscribe('memberOfUnits')
});

Template.projectsSidebar.helpers({
    myProjects: () => {
            return {projects: Projects.find()}
    }
})
