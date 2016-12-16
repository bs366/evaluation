Template.registerHelper('prettyDate', (date) => {
  return moment(date).format("ddd, MMMM Do YYYY")
});

Template.registerHelper('isAdmin', () => {
  let adminUnits = Units.findOne({
    $or: [{
      superAdmins: Meteor.userId()
    }, {
      admins: Meteor.userId()
    }]
  })
  if (adminUnits) {
    return true
  } else {
    return false
  }
})

Template.registerHelper('unitName', (id) => {
  return Units.findOne(id).name
});

Template.registerHelper('profileById', (id) => {
  try {
    let profile = Meteor.users.findOne(id);
    return profile
  } catch (exception) {
    return exception
  }
})


Template.registerHelper('nameFromId', (id) => {
  try {
    let usr = Meteor.users.findOne(id)
    return usr.profile
  } catch (exception) {
    return exception
  }
})

Template.registerHelper('unitFromId', (id) => {
  try {
    let unit = Units.findOne(id)
    if (unit)
      return unit
  } catch (exception) {
    return exception
  }
})

Template.registerHelper('emailFromId', (id) => {
  try {
    let usr = Meteor.users.findOne(id)
    if (typeof usr.services.google !== "undefined") {
      return usr.services.google.email
    } else {
      return usr.emails[0].address
    }
  } catch (exception) {
    return exception
  }
})

Template.registerHelper('isReady', () => {
  return FlowRouter.subsReady();
})

Template.registerHelper('isLoggedOut', () => {
  if (!Meteor.user()) {
    return "logged-out";
  }
})

Template.registerHelper('currentRootId', () => {
  return Session.get('root')
})

Template.registerHelper('childUnits', (unitId) => {
  let parent = Units.findOne(unitId)
  if (parent.children) {
    return {
      parentUnit: parent,
      childUnit: Units.find({
        _id: {
          $in: parent.children
        }
      })
    }
  }
})

Template.registerHelper('addPadding', (padAmount) => {
  return padAmount + 10
}, )
