// http://www.stefanhayden.com/blog/2015/05/25/user-profile-edit-with-autoform-and-simpleschema-in-meteor-js/

UserProfile = new SimpleSchema({
	firstName: {
		type: String,
		regEx: /[a-zA-Z-]{2,25}/,
		optional: true
	},
	lastName: {
		type: String,
		regEx: /[a-zA-Z-]{2,25}/,
		optional: true
	},
	phone: {
		type: String,
		regEx: /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/,
		optional: true
	},
	birthday: {
		type: Date,
		optional: true,
		autoform: {
      		type:"pickadate"
    	}
	},
	website: {
		type: String,
		regEx: SimpleSchema.RegEx.Url,
		optional: true
	},
	bio: {
		type: String,
		optional: true
	},
	jobTitle: {
		type: String,
		optional: true
	},
	avatar: {
		type: String,
		optional: true
	},
	defaultOrg: {
		type: String,
		optional: true
	}
});

User = new SimpleSchema({
	// username: {
	// 	type: String,
	// 	regEx: /[a-z0-9A-Z_.]{3,20}/,
	// 	optional: true
	// },
	emails: {
		type: [Object],
		optional: true
	},
	"emails.$.address": {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	"emails.$.verified": {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	profile: {
		type: UserProfile,
		optional: true
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true
	}
});
Meteor.users.attachSchema(User);

Meteor.users.allow({
  insert: () => false,
  update: () => true,
  remove: () => false
});
/*
Meteor.users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
*/

