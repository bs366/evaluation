Template.units.helpers({
    myUnits: () => {
        let units = Units.find()
        let mine = new Meteor.Collection(null)
        units.forEach((unit) => {
            if (!Units.findOne(unit.parent)) {
                mine.insert(unit)
            }
        })
        return mine.find()
    }
})

Template.units.events({
    'click .root-choice': (event) => {
        event.preventDefault();
        Session.setPersistent('root', event.target.value)
        Meteor.users.update(Meteor.userId(), {$set: {'profile.defaultOrg': event.target.value}})
        FlowRouter.go('/')
    }
})


Template.unitView.helpers({
    unit: () => {
        let unitId = FlowRouter.getParam('id')
        return Units.findOne(unitId)
    }
})

Template.inviteUser.events({
    'submit #invite-user': (event) => {
        event.preventDefault()
        let email = event.target.email.value
        let unitId = FlowRouter.getParam('id')
        console.log(email)
        Meteor.call("inviteUser", unitId, email)
    }
})

AutoForm.hooks({
    insertRootUnitForm: {
        before: {
            insert: (doc) => {
                doc.owner = Meteor.userId()
                doc.admins = [Meteor.userId()]
                doc.superAdmins = [Meteor.userId()]
                doc.members = [Meteor.userId()]
                doc.adminPerm = {
                    'canEval': true,
                    'canDivide': true,
                    'canAlterPerms': true,
                    'canAlterMembers': true
                }
                doc.superAdminPerm = {
                    'canView': true,
                    'canEval': false,
                    'canDivide': false,
                    'canAlterPerms': false,
                    'canAlterMembers': false
                }
                return doc
            }
        }
    },
    insertChildUnitForm: {
        before: {
            insert: (doc) => {
                try {
                    doc.owner = Meteor.userId()
                    doc.admins = [Meteor.userId()]
                    doc.parent = FlowRouter.getParam('id')
                    doc.root = Session.get('root')
                    doc.adminPerm = {
                        'canEval': true,
                        'canDivide': true,
                        'canAlterPerms': true,
                        'canAlterMembers': true
                    }
                    doc.superAdminPerm = {
                        'canView': true,
                        'canEval': false,
                        'canDivide': false,
                        'canAlterPerms': false,
                        'canAlterMembers': false
                    }
                    return doc
                } catch (exception) {
                    return exception
                }
            }
        },
        onSuccess: (formType, result) => {
            Units.update(FlowRouter.getParam('id'), { $addToSet: { children: result } })
        }
    },
    'userProfileEdit': {
        onSuccess: () => {
            FlowRouter.go('index')
        }
    }
})

AutoForm.addHooks(null, {
    onSuccess: () => {
        if ($('.lean-overlay')) {
            MaterializeModal.close();
        }
    }
});
