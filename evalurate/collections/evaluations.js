SimpleSchema.debug = true;

EvalTemplates = new Meteor.Collection('evalTemplates');

EvalTemplates.allow({
    insert: () => true,
    update: () => true,
    remove: () => false
});

let field = new SimpleSchema({
    "name": {
        type: String
    },
    "label": {
        type: String,
        optional: true
    },
    "type": {
        type: String,
        allowedValues: ["Boolean", "String", "Number", "Eval"]
    },
    "modifier": {
        type: String,
        allowedValues: ["eachMember"],
        optional: true
    },
    "autoform": {
      type: Object,
      blackbox: true,
      optional: true
    }
})


let EvalTemplateSchema = new SimpleSchema({
    "title": {
        type: String,
        label: "Title"
    },
    "creator": {
        type: String,
        autoValue: function() {
          if(this.userId)
            return this.userId
        },
        autoform: {
            afFieldInput: {
                type: "hidden"
            },
            afFormGroup: {
                label: false
            }
        }
    },
    "fields": {
        type: [field]
    }
});

EvalTemplates.attachSchema(EvalTemplateSchema);


Evaluations = new Meteor.Collection('evaluations')

Evaluations.allow({
    insert: (userId, doc) => true,
    update: () => true,
    remove: () => false
})

let EvaluationSchema = new SimpleSchema({
    "templateId": {
        type: String,
        label: "Evaluation Template",
        autoform: {
          options: function() {
            var options = [];
            EvalTemplates.find().forEach(function(temp) {
                  options.push({
                    label: temp.title,
                    value: temp._id
                  })
                })
            return options
          }
        }
    },
    "owner": {
        type: String,
        autoValue: function() {
            return this.userId
        },
        autoform: {
            afFieldInput: {
                type: "hidden"
            },
            afFormGroup: {
                label: false
            }
        }
    },
    "projectId": {
        type: String
    },
    "dueDate": {
        type: Date
        // autoform: {
        //     type: 'pickadate'
        // }
    }
})

Evaluations.attachSchema(EvaluationSchema)
