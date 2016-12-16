Units = new Meteor.Collection( 'units' );

Units.allow({
  insert: (userId, doc) => {
    let parent = Units.findOne(doc.parent)
    if (parent){
      if (Meteor.call('checkUnitPermissions', 'canDivide', parent._id, userId))
        return true
    }else {
      return true
    }
    return false
  },
  update: (userId, doc, fieldNames, modifier) => {
    let perms = {}
    if (fieldNames.indexOf('adminPerm') !== -1 || fieldNames.indexOf('superAdminPerm') !== -1){
       let t = Meteor.call( 'checkUnitPermissions', 'canAlterPerms', doc._id, userId)
       perms['canAlterPerms'] = t
    }
    if (fieldNames.indexOf('children') !== -1){
       let t = Meteor.call('checkUnitPermissions', 'canDivide', doc._id, userId)
       perms['canDivide'] = t
    }
    if (fieldNames.indexOf('members') !== -1){
      let t = Meteor.call('checkUnitPermissions', 'canAlterMembers', doc._id, userId)
      perms['canAlterMembers'] = t
    }
    var count = 0
    for (var key in perms){
      if (!perms[key])
        return false
      count++
    }
    if (count > 0)
      return true
    return false
  },
  remove: () => false
});

let UnitSchema = new SimpleSchema({
  "owner": {
    type: String,
    label: "The ID of the owner of this unit."
  },
  "name": {
    type: String
  },
  "children": {
    type: [String],
    label: "The immediate children",
    optional: true
  },
  "parent": {
    type: String,
    label: "The immediate parent",
    optional: true
  },
  "admins": {
    type: [String],
    label: "The admins",
    optional: true
  },
  "superAdmins": {
    type: [String],
    label: "The Super Admins",
    optional: true
  },
  "members": {
    type: [String],
    optional: true
  },
  "evaluations": {
    type: [String],
    optional: true,
    label: "pending or active evaluations"
  },
  "project": {
    type: String,
    optional: true,
    label: "Project"
  },
  "root": {
    type: String,
    optional: true
  },
  "adminPerm": {
    type: Object,
    label: "Admin Permissions"
  },
  "adminPerm.canEval": {
    type: Boolean,
    label: "Can Issue Evaluations"
  },
  "adminPerm.canDivide": {
    type: Boolean,
    label: "Can Divide Unit"
  },
  "adminPerm.canAlterMembers": {
    type: Boolean,
    label: "Can Add and Remove Members"
  },
  "adminPerm.canAlterPerms": {
    type: Boolean,
    label: "Can Alter Permissions"
  },
  "superAdminPerm": {
    type: Object,
    label: "Super Admin Permissions"
  },
  "superAdminPerm.canView": {
    type: Boolean,
    label: "Can View"
  },
  "superAdminPerm.canEval": {
    type: Boolean,
    label: "Can Issue Evaluations"
  },
  "superAdminPerm.canDivide": {
    type: Boolean,
    label: "Can Divide Unit"
  },
  "superAdminPerm.canAlterMembers": {
    type: Boolean,
    label: "Can Add and Remove Members"
  },
  "superAdminPerm.canAlterPerms": {
    type: Boolean,
    label: "Can Alter Permissions"
  },
  "temp": {
    type: Boolean,
    defaultValue: false
  }
});

Units.attachSchema( UnitSchema );
