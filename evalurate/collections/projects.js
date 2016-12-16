Projects = new Meteor.Collection('projects')

Projects.allow({
    insert: (userId, doc) => {
        let parent = Units.findOne(doc.parent)
        if (parent && Meteor.call('checkUnitPermissions', 'canEval', parent._id, userId))
            return true
        return false
    },
    update: () => true,
    remove: () => false
})

let ProjectSchema = new SimpleSchema({
    "teams": {
        type: [String]
    },
    "description": {
        type: String,
        optional: true
    },
    "name": {
        type: String
    },
    "parent": {
        type: String
    },
    "owner": {
        type: String,
        autoValue: function() {
            return this.userId
        }
    },
    "openDate": {
        type: Date,
        autoform: {
            type:"pickadate"
        }
    },
    "closeDate": {
        type: Date,
        autoform: {
            type:"pickadate"
        }
    }
})

Projects.attachSchema(ProjectSchema)

// to create a project
// create units, attach those ids to project
// to create an evaluation
// attach unit id of project
// attach a template as well
