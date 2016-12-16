Template.project.onCreated(() => {
    Template.instance().subscribe('evalTemplates')
    Template.instance().subscribe('usersProjects')
});
