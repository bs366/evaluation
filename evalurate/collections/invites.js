Invites = new Meteor.Collection( 'invites' );

Invites.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Invites.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let InvitesSchema = new SimpleSchema({
  "email": {
    type: String,
    label: "Email address of the person requesting the invite."
  },
  "invited": {
    type: Boolean,
    label: "Has this person been invited yet?"
  },
  "requested": {
    type: String,
    label: "The date this invite was requested."
  },
  "token": {
    type: String,
    label: "The token for this invitation.",
  },
  "accountCreated": {
    type: Boolean,
    label: "Has this invitation been accepted by a user?",
    optional: true
  },
  "dateInvited": {
    type: String,
    label: "The date this user was invited",
    optional: true
  }
});

Invites.attachSchema( InvitesSchema );