Template.adminSidebar.onCreated(() => {
    // Template.instance().subscribe('superAdminUnits')
    // Template.instance().subscribe('adminUnits')
    // Template.instance().subscribe('peers', Session.get('root'))
    // //Template.instance().subscribe('usersProjects')
});

Template.adminSidebar.helpers({
    myUnits: () => {
        if (FlowRouter.getRouteName() == "admin") {

        	// let units = Units.find()
          //   let mine = new Meteor.Collection(null)
          //   units.forEach((unit) => {
          //       if (!Units.findOne(unit.parent)) {
          //           mine.insert(unit)
          //       }
          //   })
            return Units.findOne(Session.get('root'))
        }
        if (typeof FlowRouter.getParam('id') !== "undefined") {
            parentUnit = Units.findOne({ children: FlowRouter.getParam('id') });
        }
        if (typeof parentUnit !== "undefined") {
            let parent = Units.findOne(parentUnit)
            if (parent.children){
              return {parentUnit: parent, childUnits: Units.find({ _id: { $in: parent.children } })}
            }
        } else {
            let units = Units.find()
            let mine = new Meteor.Collection(null)
            units.forEach((unit) => {
                if (!Units.findOne(unit.parent)) {
                    mine.insert(unit)
                }
            })
            return {childUnits: mine.find()}
        }
    },
    myProjects: () => {
        console.log(Projects.find().fetch())
        return true
    }
})
