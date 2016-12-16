const handleRedirect = (routes, redirect) => {
    let currentRoute = FlowRouter.getRouteName();
    if (routes.indexOf(currentRoute) > -1) {
        FlowRouter.go(redirect);
        return true;
    }
};

Template.default.helpers({
    loggingIn() {
        return Meteor.loggingIn();
    },
    authenticated() {
        return !Meteor.loggingIn() && Meteor.user();
    },
    redirectAuthenticated() {
        return handleRedirect([
            'login',
            'signup',
            'recover-password',
            'reset-password',
            'splash',
            'logout'
        ], '/');
    },
    redirectPublic() {
        return handleRedirect([
            'index',
            'dashboard',
            'editProfile',
            'rootChooser',
            'logout',
            'unitView',
            'admin',
            'adminUnit',
            'projects',
            'projectView',
            'createEvaluation',
            'singleEval'
        ], '/home');
    },
    isReady: function() {
        return FlowRouter.subsReady();
    }
});

Template.defaultLoggedIn.helpers({
    chooseOrg() {
        let u = Units.findOne(Session.get('root'))
        if (!u) {
            FlowRouter.go('rootChooser')
            return true
        }
        return false
    },
    forceCompleteProfile() {
        if (!Modules.client.isProfileComplete()) {
            FlowRouter.go('editProfile')
            return true
        }
        return false
    },
    checkRoutes() {
      let disallowed = ["singleEval", "evalResults", "editProfile", "rootChooser",
                        "createEvaluation", "evalResults"]
      if ($.inArray(FlowRouter.getRouteName(), disallowed) != -1){
        return true
      }
      return false
    }
});

Template.defaultLoggedIn.onCreated(() => {
    Template.instance().subscribe('userProfile')
    Template.instance().subscribe('roots')
    if (Meteor.user().profile){
        if (Meteor.user().profile.defaultOrg) {
            Session.set('root', Meteor.user().profile.defaultOrg)
        }
    }
    if (Session.get('root')){
        Template.instance().subscribe('adminUnits', Session.get('root'))
        Template.instance().subscribe('superAdminUnits', Session.get('root'))
        Template.instance().subscribe('peers', Session.get('root'))
    }
});

Template.defaultEmpty.onCreated(() => {
    Template.instance().subscribe('userProfile')
});

Template.defaultLoggedIn.onRendered(() => {
    $('.animate-this').animateCss('fadeInLeft', () => {
        //$('.fixed-action-btn').toggleClass('hidden');
    })
});

Template.defaultLoggedIn.events({
    'click .manage-people': function() {
        MaterializeModal.display({
            bodyTemplate: "peopleManagement",
            fullscreen: true
        });
    }
});

Template.defaultLoggedOut.helpers({
  isSplash() {
    if (FlowRouter.getRouteName() === "splash"){
      return true
    }
    return false
  }
})
