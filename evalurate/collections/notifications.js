Notifications = new Meteor.Collection('notifications');

Notifications.allow({
	insert: () => true,
	update: () => true,
    remove: () => false
})

let NotificationSchema = new SimpleSchema({
	userId: {
		type: String
	},
	message: {
		type: String
	}, 
	createdAt: {
		type: Date
	},
	isRead: {
		type: Boolean,
		defaultValue: false
	},
	isDeleted: {
		type: Boolean,
		defaultValue: false
	}
});

Notifications.attachSchema(NotificationSchema);