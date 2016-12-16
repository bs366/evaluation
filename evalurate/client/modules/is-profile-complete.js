let _ = lodash

let isProfileComplete = ( ) => {
  return _isProfileComplete( Meteor.user() );
};

let _isProfileComplete = ( user ) => {
  let emptyProfile = ['firstName', 'lastName', 'phone', 'jobTitle']
  let len = emptyProfile.length
  if (_.hasIn(user, 'profile')){
    var userProfileKeys = _.keys(user.profile)
    for (let key in userProfileKeys){
    	if (_.includes(emptyProfile, userProfileKeys[key])){
    		len--
    	}
    }
    //console.log(userProfileKeys)
    //onsole.log(_.isMatch(userProfileKeys, emptyProfile))
    return len == 0
  }

  return false
};

Modules.client.isProfileComplete = isProfileComplete;