ResponsesTemp = new Mongo.Collection('responsesTemp');

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  ResponsesTemp.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}