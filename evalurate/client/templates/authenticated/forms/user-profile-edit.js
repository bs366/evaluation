Template.userProfileEdit.helpers({
    editProfileSchema: function() {
        UserProfileEdit = new SimpleSchema({
            firstName: {
                type: String,
                regEx: /[a-zA-Z-]{2,25}/,
            },
            lastName: {
                type: String,
                regEx: /[a-zA-Z-]{2,25}/,
            },
            phone: {
                type: String,
                regEx: /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/,
            },
            birthday: {
                type: Date,
                optional: true,
                autoform: {
                    type: "pickadate"
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
            },
            avatar: {
                type: String,
                optional: true
            }
        });
        User = new SimpleSchema({
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
                type: UserProfileEdit,
                optional: true
            },
            services: {
                type: Object,
                optional: true,
                blackbox: true
            }
        });
        return User
    }
});
