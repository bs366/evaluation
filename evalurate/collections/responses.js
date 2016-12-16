Responses = new Meteor.Collection( 'responses' )

Responses.allow({
  insert: () => true,
  update: () => true,
  remove: () => false
})

let ResponseSchema = new SimpleSchema({
  "userId": {
    type: String
  },
  "evaluationId": {
    type: String
  },
  "templateId": {
    type: String
  },
  "data": {
    type: Object
  },
  "teamId": {
    type: String,
  }
})

Responses.attachSchema( ResponseSchema )
