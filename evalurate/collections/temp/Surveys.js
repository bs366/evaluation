Surveys = new Mongo.Collection('surveys');

Surveys.attachSchema(
    new SimpleSchema({
        fields: {
            type: [Object]
        },
        owner: {
            type: String,
            autoform: {
                afFieldInput: {
                    type: "hidden"
                },
                afFormGroup: {
                    label: false
                }
            },
            autoValue: function () {
                return Meteor.userId()
            }
        },
        "fields.$.name": {
            type: String,
        },
        "fields.$.label": {
            type: String,
            optional: true
        },
        "fields.$.type": {
            type: String,
            allowedValues: ["Boolean", "String", "Number"]
        }
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    Surveys.allow({
        insert: function() {
            return true;
        },
        update: function() {
            return true;
        },
        remove: function() {
            return true;
        }
    });
}