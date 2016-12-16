Template.profileView.events({
    'click .exit-modal': function() {
        $('.s3.profile-modal').animateCss('fadeOutRight', () => {
                $('.profile-view-modal').css({
                    visibility: 'hidden',
                    opacity: 0
                })
            }
        );       
        Session.set('currentProfile', undefined)
    }
});

Template.profileView.helpers({
    profileInfo: function() {
        if (typeof Session.get('currentProfile') !== "undefined") {
            let profile = Meteor.users.findOne(Session.get('currentProfile'))
            return profile
        } else {
        	return ''
        }
    }
});
