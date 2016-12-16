let _ = lodash

let isProfileComplete = ( ) => {
  return _isProfileComplete( Meteor.user() );
};

let _isProfileComplete = ( user ) => {
  let emptyProfile = ['firstName', 'lastName', 'phone', 'jobTitle']
  do{
	  if (_.hasIn(user, 'profile')){
	    var userProfileKeys = _.keys(user.profile)
	    //console.log(userProfileKeys)
	    //onsole.log(_.isMatch(userProfileKeys, emptyProfile))
	    return (_.isMatch(userProfileKeys, emptyProfile))
	  }
	}while(!FlowRouter.subsReady())

  return false
};

Modules.both.isProfileComplete = isProfileComplete;