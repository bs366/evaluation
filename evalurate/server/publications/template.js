
Meteor.publish( 'evalTemplates', function() {
	return EvalTemplates.find()
})

Meteor.publish( 'responsesTemp', function() {
	return ResponsesTemp.find()
})


Meteor.publish( 'projectEvals', function (id) {
	check(id, String)
	let e = Evaluations.find({projectId: id})
	let ids = e.map((eval) => { return eval._id })
	return [e, ResponsesTemp.find({evaluationId: {$in: ids}})]
})
//Used for template based subscription of Evaluations
//Want to point out that even though we only want to find one, we need to use find() over findOne()
//This is because return expects a cursor, not an object.
Meteor.publish( 'singleResponse', function(id) {
	check(id, String)
	return ResponsesTemp.find({surveyId: id})
} )

Meteor.publish( 'singleEval', function(id) {
	check(id, String)
	return Evaluations.find({_id: id})
})

Meteor.publish( 'singleInvite', function(token) {
	check(token, String);
	return Invites.find({ token: token });
})
